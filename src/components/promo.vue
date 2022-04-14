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
                        v-model="formPromo.kode_promo"
                        label="Kode Promo"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formPromo.jenis_promo"
                        label="Nama Mobil"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formPromo.keterangan"
                        label="Keterangan"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formPromo.nilai_promo"
                        label="Nilai Promo"
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
                        v-model="formPromo.jenis_promo"
                        label="Nama Mobil"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formPromo.keterangan"
                        label="Keterangan"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formPromo.nilai_promo"
                        label="Nilai Promo"
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
    name: "promo",
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
                    value: "kode_promo",
                },
                { text: "Nama Mobil", value: "jenis_promo" },
                { text: "Keterangan", value: "keterangan" },
                { text: "Nilai Promo", value: "nilai_promo" },
                { text: "Actions", value: "actions"},
            ],
            datas: [],
            formPromo: { 
                kode_promo: null,
                jenis_promo: null, 
                keterangan: null, 
                nilai_promo: null
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
            var url = this.$api + '/promo';
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
            this.data.append('kode_promo', this.formPromo.kode_promo);
            this.data.append('jenis_promo', this.formPromo.jenis_promo);
            this.data.append('keterangan', this.formPromo.keterangan);
            this.data.append('nilai_promo', this.formPromo.nilai_promo);
            var url = this.$api + '/promo'
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
            this.dialogData.jenis_promo = data.jenis_promo;
            this.dialogData.keterangan = data.keterangan;
            this.dialogData.nilai_promo = data.nilai_promo;
            this.dialog = true;
        },

        editMobil(data){
            this.inputType = 'Ubah';
            this.editedId = data.kode_promo;
            this.formPromo.jenis_promo = data.jenis_promo;
            this.formPromo.keterangan = data.keterangan;
            this.formPromo.nilai_promo = data.nilai_promo;
            this.dialogEdit = true;
        },

        update(){
            let newData = {
                jenis_promo: this.formPromo.jenis_promo,
                keterangan:  this.formPromo.keterangan,
                nilai_promo: this.formPromo.nilai_promo
            };
            var url = this.$api + '/promo/' + this.editedId;
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
            this.editedId = item.kode_promo;
            this.deleteDialog = true;
        },

        deleteData(){
            var url = this.$api + '/promo/' + this.editedId;
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
            this.formPromo = {
                kode_promo: null,
                jenis_promo: null, 
                keterangan: null, 
                nilai_promo: null,
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