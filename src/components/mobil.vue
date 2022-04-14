<template>
    <v-main class = "list">
    <h3 class="text-h3 font-weight-medium mb-5">Mobil</h3>
    <v-card>
        <v-card-title>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="success" dark @click="dialog = true"> Tambah </v-btn>
        </v-card-title>
        <v-data-table :headers="headers" :items="datas" 
            :search="search" 
            :single-expand="singleExpand" 
            :expanded.sync="expanded"
            item-key="task"
            show-expand
            class="elevation-1"
        >
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mx-2" @click="editMobil(item)" color="red"> mdi-pencil </v-icon>
                <v-icon small @click="deleteMobil(item)" color="success"> mdi-delete </v-icon>
            </template>
        </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">Form Mobil</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-text-field
                        v-model="formMobil.plat_mobil"
                        label="Plat Mobil"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.nama_mobil"
                        label="Nama Mobil"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.tipe_mobil"
                        label="Tipe Mobil"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.jenis_transmisi"
                        label="Jenis Transmisi"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.jenis_bahan_bakar"
                        label="Jenis Bahan Bakar"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.volume_bahan_bakar"
                        label="Volume Bahan Bakar"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.warna_mobil"
                        label="Warna Mobil"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.kapasitas_penumpang"
                        label="Volume Bagasi"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.fasilitas"
                        label="Fasilitas"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.nomor_stnk"
                        label="Nomor STNK"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.no_ktp_pemilik"
                        label="No KTP Pemilik (Jika ada, Jika tidak isi - )"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.id_brosur"
                        label="Id Brosur"
                        required
                    ></v-text-field>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                <v-btn color="blue darken-1" text @click="setForm"> Save </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="dialogEdit" persistent max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">Form Mobil</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-text-field
                        v-model="formMobil.nama_mobil"
                        label="Nama Mobil"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.tipe_mobil"
                        label="Tipe Mobil"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.jenis_transmisi"
                        label="Jenis Transmisi"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.jenis_bahan_bakar"
                        label="Jenis Bahan Bakar"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.volume_bahan_bakar"
                        label="Volume Bahan Bakar"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.warna_mobil"
                        label="Warna Mobil"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.kapasitas_penumpang"
                        label="Volume Bagasi"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.fasilitas"
                        label="Fasilitas"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.nomor_stnk"
                        label="Nomor STNK"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.no_ktp_pemilik"
                        label="No KTP Pemilik (Jika ada, Jika tidak isi - )"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.id_brosur"
                        label="Id Brosur"
                        required
                    ></v-text-field>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                <v-btn color="blue darken-1" text @click="setForm"> Save </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          Confirm to Delete This Item?
        </v-card-title>
        <v-card-text>This item will be deleted!!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer> 
          <v-btn color="red" text @click="cancelDelete"> Cancel </v-btn>
          <v-btn color="green darken-1" text @click="deleteData"> Delete </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      :timeout="-1"
      :value="true"
      color="green"
      absolute
      bottom
      rounded="pill"
      top
      v-model="success"
    >
    <template v-slot:action="{ attrs }">
        <v-btn color="red darken" text right v-bind="attrs"  @click="success = false"> Close </v-btn>
    </template>
    Success!
    </v-snackbar>
    <v-snackbar
      :timeout="-1"
      :value="true"
      color="red"
      absolute
      bottom
      rounded="pill"
      top
      v-model="fail"
    >
    <template v-slot:action="{ attrs }">
        <v-btn color="white" text right v-bind="attrs"  @click="fail = false"> Close </v-btn>
    </template>
    Fail!
    </v-snackbar>
    </v-main>
</template>

<script>
export default {
    name: "Brosur",
    data(){
        return{
            inputType: 'Tambah',
            data: new FormData,
            search: null,
            dialog: false,
            dialogEdit: false,
            deleteDialog: false,
            success: false,
            fail: false,
            expanded: [],
            singleExpand: false,
            headers: [
                {
                    text: "Plat Mobil",
                    align: "start",
                    sortable: true,
                    value: "plat_mobil",
                },
                { text: "Nama Mobil", value: "nama_mobil" },
                { text: "Tipe Mobil", value: "tipe_mobil" },
                { text: "Jenis Transmisi", value: "jenis_transmisi" },
                { text: "Jenis Bahan Bakar", value: "jenis_bahan_bakar" },
                { text: "Voluem Bahan Bakar", value: "volume_bahan_bakar"},
                { text: "Warna Mobil", value: "warna_mobil" },
                { text: "Kapasitas Penumpang", value: "kapasitas_penumpang" },
                { text: "Fasilitas", value: "fasilitas" },
                { text: "Harga Sewa", value: "nomor_stnk" },
                { text: "Nomor KTP Pemilik", value: "no_ktp_pemilik"},
                { text: "Id Brosur", value: "id_brosur"},
                { text: "Actions", value: "actions"},
            ],
            datas: [],
            formMobil: { 
                plat_mobil: null,
                nama_mobil: null, 
                tipe_mobil: null, 
                jenis_transmisi: null,
                jenis_bahan_bakar: null,
                volume_bahan_bakar: null,
                warna_mobil: null,
                kapasitas_penumpang: null,
                fasilitas: null,
                nomor_stnk: null,
                no_ktp_pemilik: null,
                id_brosur: null
            },
        };
    },

    methods: {
        setForm(){
            if(this.inputType !== 'Tambah'){
                this.update();
            }else{
                this.save();
            }
        },

        readData(){
            var url = this.$api + '/mobil';
            this.$http.get(url,
            // this.$http.get(url, {
            //     headers:{
            //         'Authorization' : 'Bearer ' + localStorage.getItem('token')
            //     }
            // }).then(response => {
            ).then(response => {
                this.datas = response.data.data;
            })
            // })
        },

        save(){
            this.data.append('plat_mobil', this.formMobil.plat_mobil);
            this.data.append('nama_mobil', this.formMobil.nama_mobil);
            this.data.append('tipe_mobil', this.formMobil.tipe_mobil);
            this.data.append('jenis_transmisi', this.formMobil.jenis_transmisi);
            this.data.append('jenis_bahan_bakar', this.formMobil.jenis_bahan_bakar);
            this.data.append('volume_bahan_bakar', this.formMobil.volume_bahan_bakar);
            this.data.append('warna_mobil', this.formMobil.warna_mobil);
            this.data.append('kapasitas_penumpang', this.formMobil.kapasitas_penumpang);
            this.data.append('fasilitas', this.formMobil.fasilitas);
            this.data.append('nomor_stnk', this.formMobil. nomor_stnk);
            this.data.append('no_ktp_pemilik', this.formMobil.no_ktp_pemilik);
            this.data.append('id_brosur', this.formMobil.id_brosur);
            var url = this.$api + '/mobil'
            this.load = true;
            this.$http.post(url, this.data, {
                // headers: {
                //     'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                // }
            }).then(response => {
                this.error_message =  response.data.message;
                // this.color = "green";
                this.success = true;
                this.load = true;
                this.readData();
                this.resetForm();
                this.close();
            }).catch(error =>{
                this.error_message = error.response.data.message;
                // this.color = "red";
                this.fail = true;
                this.load = false;
            });
            // if(this.editedIndex >= 0){
            //     Object.assign(this.todos[this.editedIndex], this.formTodo);
            //     this.resetForm();
            //     this.dialog = false;
            // }else{
            //     this.todos.push(this.formTodo);
            //     this.resetForm();
            //     this.dialog = false;
            // }
        },

        openMobil(data){
            this.dialogData.nama_mobil = data.nama_mobil;
            this.dialogData.tipe_mobil = data.tipe_mobil;
            this.dialogData.jenis_transmisi = data.jenis_transmisi;
            this.dialogData.jenis_bahan_bakar = data.jenis_bahan_bakar;
            this.dialogData.volume_bahan_bakar = data.volume_bahan_bakar;
            this.dialogData.warna_mobil = data.warna_mobil;
            this.dialogData.kapasitas_penumpang = data.kapasitas_penumpang;
            this.dialogData.fasilitas = data.fasilitas;
            this.dialogData.nomor_stnk = data.nomor_stnk;
            this.dialogData.no_ktp_pemilik = data.no_ktp_pemilik;
            this.dialogData.id_brosur = data.id_brosur;
            this.dialog = true;
        },

        editMobil(data){
            this.inputType = 'Ubah';
            this.editedId = data.plat_mobil;
            this.formMobil.nama_mobil = data.nama_mobil;
            this.formMobil.tipe_mobil = data.tipe_mobil;
            this.formMobil.jenis_transmisi = data.jenis_transmisi;
            this.formMobil.jenis_bahan_bakar = data.jenis_bahan_bakar;
            this.formMobil.volume_bahan_bakar = data.volume_bahan_bakar;
            this.formMobil.warna_mobil = data.warna_mobil;
            this.formMobil.kapasitas_penumpang = data.kapasitas_penumpang;
            this.formMobil.fasilitas = data.fasilitas;
            this.formMobil.nomor_stnk = data.nomor_stnk;
            this.formMobil.no_ktp_pemilik = data.no_ktp_pemilik;
            this.formMobil.id_brosur = data.id_brosur;
            this.dialogEdit = true;
        },

        update(){
            let newData = {
                nama_mobil: this.formMobil.nama_mobil,
                tipe_mobil:  this.formMobil.tipe_mobil,
                jenis_transmisi: this.formMobil.jenis_transmisi,
                jenis_bahan_bakar: this.formMobil.jenis_bahan_bakar,
                volume_bahan_bakar: this.formMobil.volume_bahan_bakar,
                warna_mobil: this.formMobil.warna_mobil,
                kapasitas_penumpang: this.formMobil.kapasitas_penumpang,
                fasilitas: this.formMobil.fasilitas,
                nomor_stnk: this.formMobil.nomor_stnk,
                no_ktp_pemilik: this.formMobil.no_ktp_pemilik,
                id_brosur: this.formMobil.id_brosur
            };
            var url = this.$api + '/mobil/' + this.editedId;
            this.load = true;
            this.$http.put(url, newData, {
                // headers:{
                //     'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                // }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.success = true;
                this.load = false;
                this.close();
                this.readData();
                this.resetForm();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.fail = true;
                this.load = false;
            })
        },

        deleteMobil(item){
            this.editedId = item.plat_mobil;
            this.deleteDialog = true;
        },

        deleteData(){
            var url = this.$api + '/mobil/' + this.editedId;
            this.load = true;
            this.$http.delete(url, {
                // headers: {
                //     'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                // }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.success = true;
                this.load = true;
                this.close();
                this.readData();
                this.resetForm();
                this.inputType = "Tambah";
            }).catch(error => {
                this.readData();
                this.error_message = error.response.data.message;
                this.color = "red";
                this.fail = true;
                this.load = false;
            });
        },

        cancel(){
            this.resetForm();
            this.readData();
            this.inputType = 'Tambah';
            this.dialog = false;
            this.dialogEdit = false;
        },

        resetForm(){
            this.formMobil = {
                plat_mobil: null,
                nama_mobil: null, 
                tipe_mobil: null, 
                jenis_transmisi: null,
                jenis_bahan_bakar: null,
                volume_bahan_bakar: null,
                warna_mobil: null,
                kapasitas_penumpang: null,
                fasilitas: null,
                nomor_stnk: null,
                no_ktp_pemilik: null,
                id_brosur: null
            };
        },

        cancelDelete(){ 
            this.resetForm();
            this.deleteDialog = false;
        },
        confirmDelete(){
            this.todos.splice(this.deleteIndex, 1);
            this.deleteDialog = false;
        },

        close(){
            // this.success = false;
            // this.fail = false;
            this.dialog = false;
            this.dialogEdit = false;
            this.inputType = 'Tambah';
            this.deleteDialog = false;
            this.readData();
        },
    },

    computed: {
        formTitle(){
            return this.inputType;
            },
    },
    
    mounted(){
        this.readData();
    },
};
</script>