<template>
    <page :title="pageTitle">
        <m-header>header</m-header>
        <container>
            <h1 class="text-center">未登录</h1>
            <p class="text-center">The page is need auth login.</p>
            <linker url="/tab/mine">to tab/mine</linker>
            <linker url="/error/200">to error</linker>

            <h1>login</h1>
            <x-form ref="form">
                <x-input
                label="用户帐户"
                title="用户帐户"
                rule="text"
                name="username"
                v-model="formData.username"
                />
                <x-input
                label="用户密码"
                title="用户密码"
                rule="pwd"
                type="password"
                name="password"
                v-model="formData.password"
                />
                <x-input required title="test" v-model="formData.test"/>

                <x-input required title="test2" type="textarea" v-model="formData.test2"/>


                <button class="btn btn-primary" @click="submit">submit</button>
            </x-form>

        </container>
        <m-footer>footer</m-footer>
    </page>
</template>

<script>
    import {PageMixin} from '@mixin'
    export default {
        name: 'login',
        mixins: [PageMixin],
        data(){
            return {
                formData: {
                    username: 'asd',
                    password: '1',
                    test: 'test',
                    test2: '6786fgghfh'
                }
            }
        },
        methods: {
            submit(){
                this.$refs.form.verify()
                .then(()=>{
                    this.$messageBox.alert('ok')
                })
                .catch(errorMsg => {
                    this.$messageBox.alert(errorMsg)
                })
            }
        }
    }
</script>

<style scoped>

</style>