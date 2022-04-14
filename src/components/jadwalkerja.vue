<template>
    <v-main class = "list">
    <h3 class="text-h3 font-weight-medium mb-5">Jadwal</h3>
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
                <v-icon small class="mx-2" @click="editDriver(item)" color="red"> mdi-pencil </v-icon>
                <v-icon small @click="deleteDriver(item)" color="success"> mdi-delete </v-icon>
            </template>
        </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">Form Jadwal</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-text-field
                        v-model="formJadwal.nama_pegawai"
                        label="Nama Pegawai"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formJadwal.hari"
                        label="Hari"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formJadwal.jam_kerja"
                        label="Jadwal Kerja"
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
    Success!
    <template v-slot:action="{ attrs }">
        <v-btn color="red darken" text right v-bind="attrs"  @click="success = false"> Close </v-btn>
    </template>
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
    name: "jadwalkerja",
    data(){
        return{
            inputType: 'Tambah',
            data: new FormData,
            search: null,
            dialog: false,
            deleteDialog: false,
            success: false,
            fail: false,
            expanded: [],
            singleExpand: false,
            headers: [
                {
                    text: "ID Jadwal",
                    align: "start",
                    sortable: true,
                    value: "id_jadwal",
                },
                { text: "Nama Driver", value: "nama_pegawai" },
                { text: "Hari", value: "hari" },
                { text: "Shift", value: "jam_kerja" },
                { text: "Actions", value: "actions"},
            ],
            datas: [],
            formJadwal: { 
                nama_pegawai: null,
                hari: null,
                jam_kerja: null
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
            var url = this.$api + '/jadwalkerja';
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
            this.data.append('nama_pegawai', this.formJadwal.nama_pegawai);
            this.data.append('hari', this.formJadwal.hari);
            this.data.append('jam_kerja', this.formJadwal.jam_kerja);
            var url = this.$api + '/jadwalkerja'
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

        openDriver(data){
            this.dialogData.nama_pegawai = data.nama_pegawai;
            this.dialogData.hari = data.hari;
            this.dialogData.jam_kerja = data.jam_kerja;
            this.dialog = true;
        },

        editDriver(data){
            this.inputType = 'Ubah';
            this.editedId = data.id_jadwal;
            this.formJadwal.nama_pegawai = data.nama_pegawai;
            this.formJadwal.hari = data.hari;
            this.formJadwal.jam_kerja = data.jam_kerja;
            this.dialog = true;
        },

        update(){
            let newData = {
                nama_pegawai: this.formJadwal.nama_pegawai,
                hari:  this.formJadwal.hari,
                jam_kerja: this.formJadwal.jam_kerja,
            };
            var url = this.$api + '/jadwalkerja/' + this.editedId;
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

        deleteDriver(item){
            this.editedId = item.id_jadwal;
            this.deleteDialog = true;
        },

        deleteData(){
            var url = this.$api + '/jadwalkerja/' + this.editedId;
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
        },

        resetForm(){
            this.formJadwal = {
                nama_pegawai: null, 
                hari: null, 
                jam_kerja: null,
            };
        },

        cancelDelete(){ 
            this.resetForm();
            this.deleteDialog = false;
        },

        close(){
            // this.success = false;
            // this.fail = false;
            this.dialog = false;
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