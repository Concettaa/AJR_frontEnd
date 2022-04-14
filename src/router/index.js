import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path){
    return () => import(`../components/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            // name: "admin",
            component: importComponent("DashboardLayout"),
            children: [
                {
                    path: "/",
                    name: "Root",
                    component: importComponent("Dashboard"),
                },

                {
                    path: "/brosur",
                    name: "Brosur",
                    component: importComponent("brosur"),
                },
                {
                    path: "/customer",
                    name: "Customer",
                    component: importComponent("customer"),
                },
                {
                    path: "/detailjadwal",
                    name: "Detail Jadwal",
                    component: importComponent("detailjadwal"),
                },
                {
                    path: "/jadwalkerja",
                    name: "Jadwal Kerja",
                    component: importComponent("jadwalkerja"),
                },
                {
                    path: "/driver",
                    name: "Driver",
                    component: importComponent("driver"),
                },
                {
                    path: "/mobil",
                    name: "Mobil",
                    component: importComponent("mobil"),
                },
                {
                    path: "/mobilmitra",
                    name: "Mobil Mitra",
                    component: importComponent("mobilmitra"),
                },
                {
                    path: "/pegawai",
                    name: "Pegawai",
                    component: importComponent("pegawai"),
                },
                {
                    path: "/promo",
                    name: "Promo",
                    component: importComponent("promo"),
                },
                {
                    path: "/role",
                    name: "Role",
                    component: importComponent("role"),
                },
                {
                    path: "/transaksi",
                    name: "Transaksi",
                    component: importComponent("transaksi"),
                },
            ],
        },
    ],
});

export default router;