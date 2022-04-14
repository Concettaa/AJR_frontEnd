<template>
    <v-main class = "list">
    <h3 class="text-h3 font-weight-medium mb-5">Brosur</h3>
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
                <v-icon small class="mx-2" @click="editBrosur(item)" color="red"> mdi-pencil </v-icon>
                <v-icon small @click="deleteBrosur(item)" color="success"> mdi-delete </v-icon>
            </template>
        </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">Form Brosur</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-text-field
                        v-model="formBrosur.nama_mobil"
                        label="Nama Mobil"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formBrosur.tipe_mobil"
                        label="Tipe Mobil"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formBrosur.jenis_transmisi"
                        label="Jenis Transmisi"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formBrosur.jenis_bahan_bakar"
                        label="Jenis Bahan Bakar"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formBrosur.warna_mobil"
                        label="Warna Mobil"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formBrosur.volume_bagasi"
                        label="Volume Bagasi"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formBrosur.fasilitas"
                        label="Fasilitas"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formBrosur.harga_sewa"
                        label="Harga Sewa"
                        required
                    ></v-text-field>
                    <!-- <v-select
                        v-model="formTodo.priority"
                        :items="['Penting', 'Biasa', 'Tidak Penting']"
                        label="Priority"
                        required
                    ></v-select> -->

                    <!-- <v-textarea
                        v-model="formTodo.note"
                        label="Note"
                        required
                    ></v-textarea> -->
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
    </v-main>
</template>

<script>
export default {
    name: "List",
    data(){
        return{
            inputType: 'Tambah',
            data: new FormData,
            search: null,
            dialog: false,
            deleteDialog: false,
            expanded: [],
            singleExpand: false,
            headers: [
                {
                    text: "ID Brosur",
                    align: "start",
                    sortable: true,
                    value: "id_brosur",
                },
                { text: "Nama Mobil", value: "nama_mobil" },
                { text: "Tipe Mobil", value: "tipe_mobil" },
                { text: "Jenis Transmisi", value: "jenis_transmisi" },
                { text: "Jenis Bahan Bakar", value: "jenis_bahan_bakar" },
                { text: "Warna Mobil", value: "warna_mobil" },
                { text: "Volume Bagasi", value: "volume_bagasi" },
                { text: "Fasilitas", value: "fasilitas" },
                { text: "Harga Sewa", value: "harga_sewa" },
                { text: "Actions", value: "actions"},
            ],
            datas: [],
            // todos: [
            //     {
            //         task: "Coding",
            //         priority: "Penting",
            //         note: "Code for your life",
            //     },
            //     {
            //         task: "Gaming",
            //         priority: "Tidak Penting",
            //         note: "Wasting time",
            //     },
            //     {
            //         task: "Masak",
            //         priority: "Biasa",
            //         note: "Indomi saat coding terbaik gan",
            //     },
            // ],
            formBrosur: { 
                nama_mobil: null, 
                tipe_mobil: null, 
                jenis_transmisi: null,
                jenis_bahan_bakar: null,
                warna_mobil: null,
                volume_bagasi: null,
                fasilitas: null,
                harga_sewa: null,
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
            var url = this.$api + '/brosur';
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
            this.data.append('nama_mobil', this.formBrosur.nama_mobil);
            this.data.append('tipe_mobil', this.formBrosur.tipe_mobil);
            this.data.append('jenis_transmisi', this.formBrosur.jenis_transmisi);
            this.data.append('jenis_bahan_bakar', this.formBrosur.jenis_bahan_bakar);
            this.data.append('warna_mobil', this.formBrosur.warna_mobil);
            this.data.append('volume_bagasi', this.formBrosur.volume_bagasi);
            this.data.append('fasilitas', this.formBrosur.fasilitas);
            this.data.append('harga_sewa', this.formBrosur. harga_sewa);
            var url = this.$api + '/brosur'
            this.load = true;
            this.$http.post(url, this.data, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message =  response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.readData();
                this.resetForm();
                this.close();
            }).catch(error =>{
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
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

        openBrosur(data){
            this.dialogData.nama_mobil = data.nama_mobil;
            this.dialogData.tipe_mobil = data.tipe_mobil;
            this.dialogData.jenis_transmisi = data.jenis_transmisi;
            this.dialogData.jenis_bahan_bakar = data.jenis_bahan_bakar;
            this.dialogData.warna_mobil = data.warna_mobil;
            this.dialogData.volume_bagasi = data.volume_bagasi;
            this.dialogData.fasilitas = data.fasilitas;
            this.dialogData.harga_sewa = data.harga_sewa;
            this.dialog = true;
        },

        editBrosur(data){
            this.inputType = 'Ubah';
            this.editedId = data.id_brosur;
            this.formBrosur.nama_mobil = data.nama_mobil;
            this.formBrosur.tipe_mobil = data.tipe_mobil;
            this.formBrosur.jenis_transmisi = data.jenis_transmisi;
            this.formBrosur.jenis_bahan_bakar = data.jenis_bahan_bakar;
            this.formBrosur.warna_mobil = data.warna_mobil;
            this.formBrosur.volume_bagasi = data.volume_bagasi;
            this.formBrosur.fasilitas = data.fasilitas;
            this.formBrosur.harga_sewa = data.harga_sewa;
            this.dialog = true;
        },

        update(){
            let newData = {
                nama_mobil: this.formBrosur.nama_mobil,
                tipe_mobil:  this.formBrosur.tipe_mobil,
                jenis_transmisi: this.formBrosur.jenis_transmisi,
                jenis_bahan_bakar: this.formBrosur.jenis_bahan_bakar,
                warna_mobil: this.formBrosur.warna_mobil,
                volume_bagasi: this.formBrosur.volume_bagasi,
                fasilitas: this.formBrosur.fasilitas,
                harga_sewa: this.formBrosur.harga_sewa
            };
            var url = this.$api + '/brosur/' + this.editedId;
            this.load = true;
            this.$http.put(url, newData, {
                // headers:{
                //     'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                // }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData();
                this.resetForm();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            })
        },

        deleteBrosur(item){
            this.editedId = item.id_brosur;
            this.deleteDialog = true;
        },

        deleteData(){
            var url = this.$api + '/brosur/' + this.editedId;
            this.load = true;
            this.$http.delete(url, {
                // headers: {
                //     'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                // }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.close();
                this.readData();
                this.resetForm();
                this.inputType = "Tambah";
            }).catch(error => {
                this.readData();
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },

        cancel(){
            this.resetForm();
            this.readData();
            this.inputType = 'Tambah';
            this.dialog = false;
        },

        resetForm(){
            this.formBrosur = {
                nama_mobil: null, 
                tipe_mobil: null, 
                jenis_transmisi: null,
                jenis_bahan_bakar: null,
                warna_mobil: null,
                volume_bagasi: null,
                fasilitas: null,
                harga_sewa: null
            };
        },

        
        // editItem(item){
        //     this.dialog = true;
        //     this.editedIndex = this.todos.indexOf(item);
        //     this.formBrosur = Object.assign({}, item);
        // },
        // deleteItem(item){
        //     this.deleteIndex = this.todos.indexOf(item);
        //     this.formBrosur = Object.assign({}, item);
        //     this.deleteDialog = true;
        // },
        cancelDelete(){ 
            this.resetForm();
            this.deleteDialog = false;
        },
        confirmDelete(){
            this.todos.splice(this.deleteIndex, 1);
            this.deleteDialog = false;
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