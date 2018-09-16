import { log } from '../utils/index'
import m from 'mithril'
import { map } from 'ramda'
import UIButton from '../components/ui/UIButton.jsx';
import { setText, loginTask, updateGists } from './model.js'


const createLoginPage = (navigator, update) => {
    let state = {
        status: { error: false, msg: '' }
    }
    const updateText = field => setText(update)(field)
    const onError = state => e => {
        state.status.error = true
        state.status.msg = 'Error with logging in'
    }

    const onSuccess = state => name => data => {
        state.status.error = false
        updateGists(update)(data)
        navigator.navigateTo('presentations', { name })
    }

    const login = name => loginTask(name).fork(onError(state), onSuccess(state)(name))

    const reset = state =>
        state = { error: false, msg: '' }

    return {
        view: ({ attrs: { model } }) => {
            return <div class="container">
                <div class="section">
                    <div class="hero is-large">
                        <h1 class="app-title title is-bold">Welcome</h1>
                    </div>
                    <div class="hero">
                        <input class="input" value={model.user.name} oninput={updateText("name")} />
                        {state.status.msg}
                        <UIButton action={() => login(model.user.name)} name="LOGIN" />
                    </div>
                </div>
            </div>
        },
        onremove: () => reset()
    }
}

export default createLoginPage