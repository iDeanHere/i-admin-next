<template>
  <div class="bg-login-main flex h-screen w-screen min-h-screen items-center overflow-hidden">
    <el-form
      ref="formRef"
      :model="loginForm"
      :rules="loginFormRules"
      class="login-form inline-block h-70 w-72 min-h-full sm:w-100 mx-auto pt-48"
      autocomplete="on"
      label-position="left"
    >
      <div class="text-center text-white">
        <h1 class="text-3xl mb-8">i admin</h1>
      </div>
      <el-form-item prop="username">
        <div class="flex p-1">
          <span class="icon-wrapper">
            <icon-svg icon-name="user" />
          </span>
          <el-input
            ref="usernameRef"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            autocomplete="on"
            tabindex="1"
          />
        </div>
      </el-form-item>
      <el-form-item prop="password">
        <div class="flex p-1">
          <span class="icon-wrapper bg-transparent">
            <icon-svg icon-name="password" />
          </span>
          <el-input
            ref="passwordRef"
            v-model="loginForm.password"
            placeholder="Password"
            name="password"
            :type="passwordType"
            :key="passwordType"
            autocomplete="on"
            tabindex="2"
            @keyup.enter="handleLogin"
          />
          <span class="mt-2 text-lg cursor-pointer select-none text-gray-400" @click="showPwd">
            <icon-svg :icon-name="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </div>
      </el-form-item>
      <el-button :loading="loading" type="primary" @click.prevent="handleLogin" class="w-full mb-3"
        >Login</el-button
      >
      <div class="tips mb-[10px] text-sm text-white text-center">
        <span class="first-of-type:mr-[16px]">{{ tips }}</span>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, reactive, ref, Ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store/index'
export default defineComponent({
  name: 'Login',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const formRef: any = ref(null)
    const usernameRef: any = ref(null)
    const passwordRef: any = ref(null)

    const tips = ref('')
    const loading = ref(false)
    const passwordType = ref('password')
    const redirect: Ref<string> = computed(() => route.query && (route.query.redirect as string))
    const redirectQuery = computed(
      () =>
        route.query &&
        Object.keys(route.query).reduce((acc: any, cur: string) => {
          if (cur !== 'redirect') {
            acc[cur] = route.query[cur]
          }
          return acc
        }, {}) // FIXME Dictionary<string>
    )
    const loginForm = reactive({ username: '', password: '' })
    onMounted(() => {
      loginForm.username = 'admin'
      loginForm.password = '111111'
      usernameRef.value.focus()
    })
    const loginFormRules = reactive({
      username: [
        {
          required: true,
          trigger: 'blur',
          type: 'enum',
          enum: ['admin', 'editor'],
          message: 'Username is unavailable.',
        },
      ],
      password: [
        {
          required: true,
          min: 6,
          trigger: 'blur',
          message: 'The password should more than 6 digits.',
        },
      ],
    })

    function handleLogin() {
      formRef.value.validate((valid: any) => {
        if (valid) {
          loading.value = true
          setTimeout(() => {
            store
              .dispatch('user/login', loginForm)
              .then(() => {
                router.push({
                  path: redirect.value || '/',
                  query: redirectQuery.value,
                })
                loading.value = false
              })
              .catch(() => {
                loading.value = false
              })
          }, 2500)
        } else {
          tips.value = 'login validate error'
          console.log(tips.value)
          return false
        }
      })
    }

    async function showPwd() {
      passwordType.value = passwordType.value === 'password' ? '' : 'password'
      await nextTick(() => {
        passwordRef.value.focus()
      })
    }

    return {
      loginForm,
      loginFormRules,
      passwordType,
      loading,
      tips,
      // refs
      formRef,
      usernameRef,
      passwordRef,
      // fnc
      handleLogin,
      showPwd,
    }
  },
})
</script>

<style lang="scss">
.login-form {
  .el-input {
    @apply h-10 w-full;
    input {
      @apply py-5 pr-2 h-47px border-0 rounded-none  bg-transparent text-login-gray-light appearance-none;
    }
  }
  .el-form-item {
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }
}
</style>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.icon-wrapper {
  @apply inline-block w-30px px-15px align-middle text-login-gray-dark;
}
</style>
