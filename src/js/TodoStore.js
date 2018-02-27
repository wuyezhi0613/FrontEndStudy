
import {observable} from 'mobx';
import { ObservableValue } from 'mobx/lib/types/observablevalue';

class TodoStore {
    @observable todos = ['buy milk', 'buy aggs'];
    @Observable filter = "" ;
}

var store = window.store = new TodoStore

export default store;