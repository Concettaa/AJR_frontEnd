<template>
    <v-main class = "list">
    <h3 class="text-h3 font-weight-medium mb-5">Mobil Mitra</h3>
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
                <span class="headline">Form Mobil Mitra</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-text-field
                        v-model="formMobil.no_ktp_pemilik"
                        label="Nomor KTP Pemilik"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.nama_pemilik"
                        label="Nama Pemilik"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.alamat_pemilik"
                        label="Alamat Pemilik"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.no_telp_pemilik"
                        label="Nomor Telepon Pemilik"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.periode_kontrak_mulai"
                        type="date"
                        label="Periode Kontrak Mulai"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.periode_kontrak_akhir"
                        type="date"
                        label="Periode Kontrak Akhir"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.tanggal_terakhir_kali_servis"
                        type="date"
                        label="Tangga Terakhir Kali Servis"
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
                        v-model="formMobil.nama_pemilik"
                        label="Nama Pemilik"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.alamat_pemilik"
                        label="Alamat Pemilik"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.no_telp_pemilik"
                        label="Nomor Telepon Pemilik"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.periode_kontrak_mulai"
                        type="date"
                        label="Periode Kontrak Mulai"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.periode_kontrak_akhir"
                        type="date"
                        label="Periode Kontrak Akhir"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formMobil.tanggal_terakhir_kali_servis"
                        type="date"
                        label="Tangga Terakhir Kali Servis"
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
                    text: "Nomor KTP Pemilik",
                    align: "start",
                    sortable: true,
                    value: "no_ktp_pemilik",
                },
                { text: "Nama Pemilik", value: "nama_pemilik" },
                { text: "Alamat Pemilik", value: "alamat_pemilik" },
                { text: "Nomor Telepon Pemilik", value: "no_telp_pemilik" },
                { text: "Periode Kontrak Mulai", value: "periode_kontrak_mulai"},
                { text: "Periode Kontrak Akhir", value: "periode_kontrak_akhir"},
                { text: "Tanggal Terakhir Kali Servis", value: "tanggal_terakhir_kali_servis"},
                { text: "Actions", value: "actions"}
            ],
            datas: [],
            formMobil: { 
                no_ktp_pemilik: null,
                nama_pemilik: null, 
                alamat_pemilik: null, 
                no_telp_pemilik: null,
                periode_kontrak_mulai: null,
                periode_kontrak_akhir: null,
                tanggal_terakhir_kali_servis: null,
                kapasitas_penumpang: null
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
            var url = this.$api + '/mobilmitra';
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
            this.data.append('no_ktp_pemilik', this.formMobil.no_ktp_pemilik);
            this.data.append('nama_pemilik', this.formMobil.nama_pemilik);
            this.data.append('alamat_pemilik', this.formMobil.alamat_pemilik);
            this.data.append('no_telp_pemilik', this.formMobil.no_telp_pemilik);
            this.data.append('periode_kontrak_mulai', this.formMobil.periode_kontrak_mulai);
            this.data.append('periode_kontrak_akhir', this.formMobil.periode_kontrak_akhir);
            this.data.append('tanggal_terakhir_kali_servis', this.formMobil.tanggal_terakhir_kali_servis);
            this.data.append('kapasitas_penumpang', this.formMobil.kapasitas_penumpang);
            var url = this.$api + '/mobilmitra'
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
            this.dialogData.nama_pemilik = data.nama_pemilik;
            this.dialogData.alamat_pemilik = data.alamat_pemilik;
            this.dialogData.no_telp_pemilik = data.no_telp_pemilik;
            this.dialogData.periode_kontrak_mulai = data.periode_kontrak_mulai;
            this.dialogData.periode_kontrak_akhir = data.periode_kontrak_akhir;
            this.dialogData.tanggal_terakhir_kali_servis = data.tanggal_terakhir_kali_servis;
            this.dialogData.kapasitas_penumpang = data.kapasitas_penumpang;
            this.dialogData.fasilitas = data.fasilitas;
            this.dialogData.nomor_stnk = data.nomor_stnk;
            this.dialogData.no_ktp_pemilik = data.no_ktp_pemilik;
            this.dialogData.id_brosur = data.id_brosur;
            this.dialog = true;
        },

        editMobil(data){
            this.inputType = 'Ubah';
            this.editedId = data.no_ktp_pemilik;
            this.formMobil.nama_pemilik = data.nama_pemilik;
            this.formMobil.alamat_pemilik = data.alamat_pemilik;
            this.formMobil.no_telp_pemilik = data.no_telp_pemilik;
            this.formMobil.periode_kontrak_mulai = data.periode_kontrak_mulai;
            this.formMobil.periode_kontrak_akhir = data.periode_kontrak_akhir;
            this.formMobil.tanggal_terakhir_kali_servis = data.tanggal_terakhir_kali_servis;
            this.formMobil.kapasitas_penumpang = data.kapasitas_penumpang;
            this.dialogEdit = true;
        },

        update(){
            let newData = {
                nama_pemilik: this.formMobil.nama_pemilik,
                alamat_pemilik:  this.formMobil.alamat_pemilik,
                no_telp_pemilik: this.formMobil.no_telp_pemilik,
                periode_kontrak_mulai: this.formMobil.periode_kontrak_mulai,
                periode_kontrak_akhir: this.formMobil.periode_kontrak_akhir,
                tanggal_terakhir_kali_servis: this.formMobil.tanggal_terakhir_kali_servis,
                kapasitas_penumpang: this.formMobil.kapasitas_penumpang,
            };
            var url = this.$api + '/mobilmitra/' + this.editedId;
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
            this.editedId = item.no_ktp_pemilik;
            this.deleteDialog = true;
        },

        deleteData(){
            var url = this.$api + '/mobilmitra/' + this.editedId;
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
                no_ktp_pemilik: null,
                nama_pemilik: null, 
                alamat_pemilik: null, 
                no_telp_pemilik: null,
                periode_kontrak_mulai: null,
                periode_kontrak_akhir: null,
                tanggal_terakhir_kali_servis: null,
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