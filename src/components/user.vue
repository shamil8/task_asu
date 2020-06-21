<template>
    <div>
        <div v-if="loader" class="lds-dual-ring"></div>
        <el-table v-else  :data="users">
            <el-table-column label="Имя" >
                <template slot-scope="scope">
                    <img class="user-icon" src="../assets/img/person.svg" alt="User">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Фамилия" >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.lastname }}</span>
                </template>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <img src="../assets/img/edit.svg" @click="handleEdit(scope.row)" class="action-icons edit" alt="Edit">
                    <img src="../assets/img/close.svg" @click="statusDialogDelete(true, scope.$index, scope.row.id)"  class="action-icons close" alt="Close">
                </template>
            </el-table-column>
        </el-table>

        <v-dialog
                :dialogVisible="dialogVisible"
                :user="user"
                @close-dialog="closeDialog"
                @get-status="getStatus"
                @user-add="userAdd"
        />

        <el-button @click="dialogVisible = true" class="add-user" type="primary">Добавить сотрудника</el-button>

<!--        Dialog delete       -->
        <el-dialog
                title="Удаление сотрудника"
                :visible.sync="dialogDeleteVisible"
                width="80%"
        >
            <span>Вы действительно хотите удалить сотрудника?</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogDeleteVisible = false">Назад</el-button>
    <el-button type="danger" @click="actionDelete">Удалить</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import '../assets/css/loader.css'
    import vDialog from "./v-dialog"
    import axios from "axios"
    export default {
        name: "user",
        components: {
            vDialog
        },
        data() {
            return {
                dialogVisible: false,
                dialogDeleteVisible: false,
                loader: true,
                users: [],
                user: {},
                delId: null,
                delIndex: null
            }
        },
        methods: {
            handleEdit(data) {
                this.dialogVisible = true
                this.user = data
            },
            actionDelete() {
                this.delId && this.delIndex
                && axios.delete('https://json-server.adib.now.sh/users/' + this.delId)
                .then(() => {
                    this.users.splice(this.delIndex, 1)
                    this.getStatus(200, 'Сотрудник был успешно удален.')
                })
                .catch(err => err.response && this.getStatus(err.response.status))
                .then(() => this.statusDialogDelete(false))
            },
            closeDialog() {
                this.dialogVisible = false
                this.user = {}
            },
            statusDialogDelete(status, index = null, id = null) {
                this.dialogDeleteVisible = status
                this.delIndex = index
                this.delId = id
            },
            getStatus(status, text = 'Успешное выполнение запроса') {
                switch (status) {
                    case 400:
                        this.$notify.error({
                            title: '400',
                            message: 'Неверный запрос',
                            duration: 1800
                        })
                        break
                    case 404:
                        this.$notify({
                            title: '404',
                            message: 'Сущность не найдена в системе',
                            type: 'warning',
                            duration: 1800
                        })
                        break
                    case 500:
                        this.$notify.error({
                            title: '500',
                            message: 'Cерверная ошибка',
                            duration: 1800
                        })
                        break
                    default:
                        this.$notify({
                            title: '200',
                            message: text,
                            type: 'success',
                            duration: 1800
                        })
                }
            },
            getUsers() {
                axios.get('https://json-server.adib.now.sh/users')
                    .then(res => {
                        if (res.data) {
                            this.users = res.data
                        }
                    })
                .catch(err => err.response && this.getStatus(err.response.status))
                .then(() => this.loader = false)
            },
            userAdd(user) {
                this.users.push(user)
            }
        },
        mounted() {
            this.getUsers()
        }
    }
</script>

<style>
    .user-icon {
        width: 24px;
    }

    .action-icons {
        width: 36px;
        cursor: pointer;
        border: 1px solid #ffcc33;
    }
    .action-icons:hover {
        transition: .3s;
        background: rgba(255, 204, 51, .9);
    }

    .edit {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        background: rgba(255, 204, 51, .5);
    }

    .close {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        background: rgba(255, 0, 0, .5);
        border-color: #ff0000;
    }
    .close:hover {
        background: rgba(255, 0, 0, .9);
    }

    /* Style for Element UI */
    .el-table thead {
        color: #000;
    }
    .el-table thead th {
        background: #f2f2f2;
    }
    .el-table tbody {
        color: #000;
    }

    .el-table tbody tr td .cell {
        display: flex;
    }
</style>
