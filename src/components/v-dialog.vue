<template>
    <el-dialog
            :title="(user.id ? 'Редактирование' : 'Создание') + ' сотрудника'"
            :visible="dialogVisible"
            @close="closeDialog"
            width="80%"
    >
        <el-form :model="user">
            <el-form-item label="Имя">
                <el-input v-model="user.name" placeholder="Введите имя сотрудника" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Фамилия">
                <el-input v-model="user.lastname" placeholder="Введите фамилию сотрудника" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="closeDialog">Назад</el-button>
    <el-button type="primary" @click="saveUser">{{ user.id ? 'Сохранить' : 'Добавить' }}</el-button>
  </span>
    </el-dialog>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "vDialog",
        props: {
            dialogVisible: {
                type: Boolean,
                default: false
            },
            user: {
                type: Object,
                default: function () {
                    return { name: '',  lastname: '' }
                }
            }
        },
        methods: {
            closeDialog() {
                this.$emit('close-dialog')
            },
            saveUser() {
                if (this.user.name && this.user.name) {
                    if (this.user.id) {
                        axios.put('https://json-server.adib.now.sh/users/' + this.user.id, this.user)
                            .then(res => {
                                if (typeof res.data === 'object') {
                                    this.$emit('get-status',200, 'Сотрудник успешно изменен')
                                }
                            })
                            .catch(err => err.response && this.$emit('get-status',err.response.status))
                    } else {
                        axios.post('https://json-server.adib.now.sh/users/', this.user)
                            .then(res => {
                                if (typeof res.data === 'object') {
                                    this.$emit('get-status',200, 'Сотрудник успешно добавлено')
                                    this.$emit('user-add', res.data)
                                }
                            })
                            .catch(err => err.response && this.$emit('get-status',err.response.status))
                    }

                    this.closeDialog()

                } else {                    // validation form
                    this.$notify.info({
                        title: 'Info',
                        message: 'Введите корректные данные',
                        duration: 2000
                    })
                }

            }
        }
    }
</script>

<style scoped>

</style>
