<template>
    <v-main class = "list">
    <h3 class="text-h3 font-weight-medium mb-5">Customer</h3>
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
                <v-icon small class="mx-2" @click="editCustomer(item)" color="red"> mdi-pencil </v-icon>
                <v-icon small @click="deleteCustomer(item)" color="success"> mdi-delete </v-icon>
            </template>
        </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">Form Customer</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-text-field
                        v-model="formCustomer.nama_customer"
                        label="Nama Customer"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formCustomer.alamat_customer"
                        label="Alamat Customer"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formCustomer.tanggal_lahir_customer"
                        type="date"
                        label="Tanggal Lahir Customer"
                        required
                    ></v-text-field>

                    <v-select
                        v-model="formCustomer.jenis_kelamin_customer"
                        :items="['Laki-Laki', 'Perempuan']"
                        label="Jenis Kelamin Customer"
                        required
                    ></v-select>

                    <v-text-field
                        v-model="formCustomer.email_customer"
                        label="Email Customer"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formCustomer.no_telp_customer"
                        label="Nomor Telepon Customer"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="formCustomer.nomor_ktp"
                        label="Nomor KTP"
                        required
                    ></v-text-field>
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
                        {{ error_message }}
                    </v-snackbar>
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
    </v-main>
</template>

<script>
export default {
    name: "Customer",
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
                    text: "ID Customer",
                    align: "start",
                    sortable: true,
                    value: "id_customer",
                },
                { text: "Nama Customer", value: "nama_customer" },
                { text: "Alamat Customer", value: "alamat_customer" },
                { text: "Tanggal Lahir Customer", value: "tanggal_lahir_customer" },
                { text: "Jenis Kelamin Customer", value: "jenis_kelamin_customer" },
                { text: "Email Customer", value: "email_customer" },
                { text: "Nomor Telepon Customer", value: "no_telp_customer" },
                { text: "Nomor KTP", value: "nomor_ktp" },
                { text: "Actions", value: "actions"},
            ],
            datas: [],
            //'id_customer',
        // 'nama_customer',
        // 'alamat_customer',
        // 'tanggal_lahir_customer',
        // 'jenis_kelamin_customer',
        // 'email_customer',
        // 'no_telp_customer',
        // 'nomor_ktp'
            formCustomer: { 
                nama_customer: null,
                alamat_customer: null,
                tanggal_lahir_customer: null,
                jenis_kelamin_customer: null,
                email_customer: null,
                no_telp_customer: null,
                nomor_ktp: null
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
            var url = this.$api + '/customer';
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
            this.data.append('nama_customer', this.formCustomer.nama_customer);
            this.data.append('alamat_customer', this.formCustomer.alamat_customer);
            this.data.append('tanggal_lahir_customer', this.formCustomer.tanggal_lahir_customer);
            this.data.append('jenis_kelamin_customer', this.formCustomer.jenis_kelamin_customer);
            this.data.append('email_customer', this.formCustomer.email_customer);
            this.data.append('no_telp_customer', this.formCustomer.no_telp_customer);
            this.data.append('nomor_ktp', this.formCustomer.nomor_ktp);
            var url = this.$api + '/customer'
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

        openCustomer(data){
            this.dialogData.nama_customer = data.nama_customer;
            this.dialogData.alamat_customer = data.alamat_customer;
            this.dialogData.tanggal_lahir_customer = data.tanggal_lahir_customer;
            this.dialogData.jenis_kelamin_customer = data.jenis_kelamin_customer;
            this.dialogData.email_customer = data.email_customer;
            this.dialogData.no_telp_customer = data.no_telp_customer;
            this.dialogData.nomor_ktp = data.nomor_ktp;
            this.dialog = true;
        },

        editCustomer(data){
            this.inputType = 'Ubah';
            this.editedId = data.id_customer;
            this.formCustomer.nama_customer = data.nama_customer;
            this.formCustomer.alamat_customer = data.alamat_customer;
            this.formCustomer.tanggal_lahir_customer = data.tanggal_lahir_customer;
            this.formCustomer.jenis_kelamin_customer = data.jenis_kelamin_customer;
            this.formCustomer.email_customer = data.email_customer;
            this.formCustomer.no_telp_customer = data.no_telp_customer;
            this.formCustomer.nomor_ktp = data.nomor_ktp;
            this.dialog = true;
        },

        update(){
            let newData = {
                nama_customer: this.formCustomer.nama_customer,
                alamat_customer:  this.formCustomer.alamat_customer,
                tanggal_lahir_customer: this.formCustomer.tanggal_lahir_customer,
                jenis_kelamin_customer: this.formCustomer.jenis_kelamin_customer,
                email_customer: this.formCustomer.email_customer,
                no_telp_customer: this.formCustomer.no_telp_customer,
                nomor_ktp: this.formCustomer.nomor_ktp,
            };
            var url = this.$api + '/customer/' + this.editedId;
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

        deleteCustomer(item){
            this.editedId = item.id_customer;
            this.deleteDialog = true;
        },

        deleteData(){
            var url = this.$api + '/customer/' + this.editedId;
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
            this.formCustomer = {
                nama_customer: null, 
                alamat_customer: null, 
                tanggal_lahir_customer: null,
                jenis_kelamin_customer: null,
                email_customer: null,
                no_telp_customer: null,
                nomor_ktp: null
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