
import Http from './base';

class Main extends Http{
    constructor(){
        super()
    }

    getList(){
      this.get('https://cnodejs.org/api/v1/topics')
    }
}

export default new Main();
