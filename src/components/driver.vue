<template>
    <v-main class = "list">
    <h3 class="text-h3 font-weight-medium mb-5">Driver</h3>
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
                <span class="headline">Form Driver</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-text-field
                        v-model="formDriver.nama_driver"
                        label="Nama Driver"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formDriver.alamat_driver"
                        label="Alamat Driver"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formDriver.tanggal_lahir_driver"
                        label="Tanggal Lahir Driver"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formDriver.jenis_kelamin_driver"
                        label="Jenis Kelamin Driver"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formDriver.email_driver"
                        label="Email Driver"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formDriver.no_telp_driver"
                        label="Nomor Telepon Driver"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formDriver.bahasa"
                        label="Nomor KTP"
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
    name: "driver",
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
                    text: "ID Driver",
                    align: "start",
                    sortable: true,
                    value: "id_driver",
                },
                { text: "Nama Driver", value: "nama_driver" },
                { text: "Alamat Driver", value: "alamat_driver" },
                { text: "Tanggal Lahir Driver", value: "tanggal_lahir_driver" },
                { text: "Jenis Kelamin Driver", value: "jenis_kelamin_driver" },
                { text: "Email Driver", value: "email_driver" },
                { text: "Nomor Telepon Driver", value: "no_telp_driver" },
                { text: "Bahasa", value: "bahasa" },
                { text: "Actions", value: "actions"},
            ],
            datas: [],
            formDriver: { 
                nama_driver: null,
                alamat_driver: null,
                tanggal_lahir_driver: null,
                jenis_kelamin_driver: null,
                email_driver: null,
                no_telp_driver: null,
                bahasa: null
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
            var url = this.$api + '/driver';
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
            this.data.append('nama_driver', this.formDriver.nama_driver);
            this.data.append('alamat_driver', this.formDriver.alamat_driver);
            this.data.append('tanggal_lahir_driver', this.formDriver.tanggal_lahir_driver);
            this.data.append('jenis_kelamin_driver', this.formDriver.jenis_kelamin_driver);
            this.data.append('email_driver', this.formDriver.email_driver);
            this.data.append('no_telp_driver', this.formDriver.no_telp_driver);
            this.data.append('bahasa', this.formDriver.bahasa);
            var url = this.$api + '/driver'
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
            this.dialogData.nama_driver = data.nama_driver;
            this.dialogData.alamat_driver = data.alamat_driver;
            this.dialogData.tanggal_lahir_driver = data.tanggal_lahir_driver;
            this.dialogData.jenis_kelamin_driver = data.jenis_kelamin_driver;
            this.dialogData.email_driver = data.email_driver;
            this.dialogData.no_telp_driver = data.no_telp_driver;
            this.dialogData.bahasa = data.bahasa;
            this.dialog = true;
        },

        editDriver(data){
            this.inputType = 'Ubah';
            this.editedId = data.id_driver;
            this.formDriver.nama_driver = data.nama_driver;
            this.formDriver.alamat_driver = data.alamat_driver;
            this.formDriver.tanggal_lahir_driver = data.tanggal_lahir_driver;
            this.formDriver.jenis_kelamin_driver = data.jenis_kelamin_driver;
            this.formDriver.email_driver = data.email_driver;
            this.formDriver.no_telp_driver = data.no_telp_driver;
            this.formDriver.bahasa = data.bahasa;
            this.dialog = true;
        },

        update(){
            let newData = {
                nama_driver: this.formDriver.nama_driver,
                alamat_driver:  this.formDriver.alamat_driver,
                tanggal_lahir_driver: this.formDriver.tanggal_lahir_driver,
                jenis_kelamin_driver: this.formDriver.jenis_kelamin_driver,
                email_driver: this.formDriver.email_driver,
                no_telp_driver: this.formDriver.no_telp_driver,
                bahasa: this.formDriver.bahasa,
            };
            var url = this.$api + '/driver/' + this.editedId;
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
            this.editedId = item.id_driver;
            this.deleteDialog = true;
        },

        deleteData(){
            var url = this.$api + '/driver/' + this.editedId;
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
            this.formDriver = {
                nama_driver: null, 
                alamat_driver: null, 
                tanggal_lahir_driver: null,
                jenis_kelamin_driver: null,
                email_driver: null,
                no_telp_driver: null,
                bahasa: null
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