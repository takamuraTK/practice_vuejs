# My vue.js practice cheat sheat.

## TemplateSyntax
- 二重括弧の中にはJavascriptをそのまま書ける（変数定義などはできない、単一の式）
```
{{ number + 5 }}
```

- 基本構文
```
new Vue({
    el: "#app",
    data: {
        message: "HelloWorld",
        number: 3
    },
    conputed: {
        test: function () {
            return this.message
        }
    },
    methods: {
        sayHi: function () {
            return 'Hi';
        }
    }
})
```

- イベントオブジェクトの取得方法
DOMイベントの中身をイベントオブジェクトと言い、例えばclickだとクリックした座標情報などが入っている。
function(event)と定義するときに引数にeventを書けば取得できる。
eventの詳細はconsole.logでeventを出力させてあげれば詳しく見ることができる。
ただし、event引数と別の引数を使用する際は、関数実行時に
func(test, $event)と指定する必要がある。

- キー修飾子
特定のDOMイベントに対して、特定のキーを押したときのみイベントを発火させたいときに使う
v-on.keyup.enter

- computedプロパティ
動的なプロパティを使いたいときに用いる、データプロパティにアクセスすることができる。
methodsとは違う。
methodsで定義したものを{{}}内で呼び出していると、ページ内で何かしらの描画に変更がある度にそのmethodsで定義されたものが実行されてしまう。このような現象を依存関係をキャッシュするという。
依存関係のキャッシュを防ぐためにcomputedプロパティを使う。
computedプロパティは参照先の値にアクションがあったときのみ実行される。
呼び出す際は()をつけてはいけない

### ディレクティブ
- v-text...引数が二重括弧で囲ったものと同じ意味を持つ
- v-once...このディレクティブがついたものは一度定義されたら二度と変化されないものになる
- v-html...プロパティで書いたHTMLをHTMLとして埋め込むことができる
- v-bind...属性に対してvueで指定させることができる、v-bind:hrefを省略して:hrefとすることも可
属性値を動的に取ることもでき、
```
<a v-bind[attribute]="url">test</a>
```
としてattributeをdata内で指定する
また、複数のv-bindはまとめることができ、
```
<a v-bind="{href: url, id: number}">test</a>
```
とすることができる。
最初から{}内をdataで定義し、テンプレートではその{}を指定すると1番シンプルに書ける
classを制御したい際は
```
<h1 :class="{ 'クラス名1':true, 'クラス名2': false }">
などとして有効無効を切り替えることができる
```

- v-on...DOMが提供しているイベントに対して関数を実行したいときに使う
v-on:DOMイベント名="関数または実行したい式"
v-bindと同様に省略記法があり、@とすればv-onとなる
clickの場合@clickだけでいい
また同様に、引数を動的に与えることもでき、同じく[]を使う
DOMイベント一覧：https://developer.mozilla.org/ja/docs/Web/Events

- v-model...双方向バインディングを可能にする
{{ message }}があって、dataにmessageを指定した場合、Vueインスタンス側からでしかmessageを変更することはできなかった。これをテンプレートHTML側から変更することができるのが双方向バインディングという


## Rendering
### templateタグの使い方
複数の要素に対してv-ifで制御をかけたい場合、それらをtemplateタグで囲み、templateタグにv-ifをつけて制御する。
templateタグはレンダリング後のHTMLに表示されない

### ディレクティブ
- v-if...値がTrueのときのみその要素が表示される
- v-else...v-ifの直下にこの属性を持つものを書くことで、v-ifがFalseのときはこの要素を表示させる
- v-else-if...v-ifの直下に書くことで、v-ifがfalseで別の条件で表示を切り替えたいときに使える
- v-show...挙動はv-ifと同じだが、v-ifがfalseのときに完全にhtmlタグごと消えるのに対して、showはdisplay: noneを付与して消す。templateタグに対しては使えない。
描画順として、まず表示させてから消すため描画速度が遅い。
v-ifは逆にまるごと消すため頻繁にボタンなどで表示を切り替える場合は重くなる。
なので頻繁に表示を切り替えるときはv-showを使う。
- v-for...配列などをイテレートする。繰り返す対象にv-for="item in items"をつける。
複数の要素をまとめて繰り返したいときはtemplateで囲んでtemplateにv-forを指定する
基本的にv-forを使うときは予期しないバグを起こさないためにkey属性を付与するのがベスト。
繰り返した各要素に対して一意の目印をつけたいときは、:key={item}などを繰り返す要素につける。
key属性はtemplateに対しては使えないことに注意（レンダリングされないため）
また、key属性にindexを指定してはいけない。

## VueInstanceDetail

### リアクティブ
Vueインスタンスは読み込まれたとき、まず各プロパティを全て渡り歩く。
渡り歩いたときに全ての各要素に対してgetterとsetterを付与する。
getterはその値が参照されたときに動くもの、
setterはその値が変更されたときに動くもの。
実際にgetterとsetterと使った処理はウォッチャーという。

Vueインスタンス内で定義されたものはgetterとsetterとウォッチャーが定義されるので、値が変更されたときに柔軟に対応される。この対応をリアクティブという。

なので、Vueインスタンス外でVueインスタンスの要素を生成してもそれらはリアクティブとならない。

### プロパティ
Vueインスタンスが元々持っているプロパティは頭に$がついている。
Vueインスタンス名.$プロパティ名 でアクセスできる。

### Templateプロパティ
HTMLごとelの要素にぶち込むときに使う

### Render関数
createElementで仮想ノード（仮想DOMのパーツのようなもの）を作成してそれをreturnする。
本来内部的にはテンプレートに書いたものは一度Render関数にコンパイルされる。

### 仮想DOM
DOMとはウェブページとプログラミング言語を結ぶもので、ツリー型の構造を持つもの。
DOM要素を模したJavascript用のオブジェクトを仮想DOMという。
例えばボタンを押して一部分変えるとき、そのアルゴリズムは押したあとと押す前のDOMを見比べて差分を検出する。
ここで、DOM自身に直接アクセスして何かしらの操作を加えるのはとてもコストパフォーマンスが悪い（遅い）
ただ、Javascript内でのアクセスは高速であるため、Javascript側でDOMを模したオブジェクトを作成し、それにアクセスすることで高いコストパフォーマンスでDOMを操作したようにできる。
これが仮想DOM。

### Vueインスタンスライフサイクル
以下に記述する関数名は実際にVueインスタンスのプロパティとして指定することで任意の処理を挟むことが可能

- new Vue()
- beforeCreate()
- インスタンスが作られる...getterやsetterが作られる
- created()
- elがあるかどうか...ある場合はテンプレートをRender関数にコンパイルする。ない場合はvm.$mount()が呼ばれてから処理を行う。
- beforeMount()
- Render関数で作った仮想ノードを組み合わせて仮想DOMを作り、仮想DOMから実際のDOMを作る。
実際のDOMを$elに入れる。
- $elにある実際のDOMを適応するべき場所に適応させる
- mounted()
（データが変わった場合）
- データ変更
- beforeUpdate()
- DOMを再描画
- update()
（破壊させる場合）
- beforeDestoroyed()
- destroyed()

## VueCLI
### VueCLIを導入する理由
- ファイル分割
- ビルドファイルの軽量化
- Pluginが使える
- HMRの使用
- .vue、.ts、SCSS、PUG、ES6の使用

### Install
```
$ vue install -g @vue/cli
$ vue create project_name
```

## Component
コンポーネントとは再利用させるもの
```
<body>
    <div id="app1">
        <my-component></my-component>
        <my-component></my-component>
        <my-component></my-component>
    </div>

    <script>
        Vue.component('my-component', {
            data: function () {
                return {
                    number: 12
                }
            },
            template: '<p>いいね{{number}}</p>'
        })

        new Vue({
            el: "#app1",
        })
    </script>
</body>
```
コンポーネントに任意の名前をつけ、そのタグを記述することで使える。

### dataプロパティは関数を書く必要がある
もし関数ではなくオブジェクトの場合、複数コンポーネントを使う場合に複数から同じオブジェクトが参照されることになる。
そうなると区別のしようがないので関数を書く必要がある。

上の書き方はグローバル登録で、全てのVueインスタンスで使えてしまう。
制限するには下記のローカル登録で記述する。
```
var component2 = {
    data: function () {
        return {
            number: 1
        }
    },
    template: '<p>いいね{{number}}</p>'
}

new Vue({
    el: "#app2",
    components: {
        'my-component2': component2
    }
})
```

### VueのImport
上からわかるようにComponentとはオブジェクトである。
main.jsにあるようなVueファイルのImportは
```
import App from './App.vue'
```
単一ファイルコンポーネントをImportしているが、これは単一ファイルコンポーネントをコンポーネントオブジェクト化したものをImportしている。
また、vueCLIにおいてimport文は@を使うことでsrcからの相対パス的な使い方ができる。
```
import { tokyoNumber } from "@/tokyoNumber";
```

### 単一ファイルコンポーネントのTemplate
```
<template>
  <div>
    <p>いいね！({{ number }})</p>
    <button @click="increment">+1</button>
  </div>
</template>
```
必ず一つの要素に囲まれていなければいけない（上だとdivに囲まれている）

### VueCLI上でのグローバル・ローカル登録
#### グローバルコンポーネント
main.js
```
import LikeNumber from './LikeNumber.vue'
Vue.component('LikeNumber', LikeNumber)
```

#### ローカルコンポーネント
App.vueのみで使いたい場合
```
import LikeHeader from "./LikeHeader.vue";
export default {
    components: {
        LikeHeader,
    },
};
```

### VueCLIのstyleのスコープ
単一ファイルコンポーネントのstyleタグ内にそのままCSSを指定すると、ページ全体に適応されてしまう。
これを防ぐために
```
<style scoped>
div {
    border: 1px solid red;
}
</style>
```
scopedをつけるとそのコンポーネント内の要素に対してのみCSSを適応できる。

### コンポーネント間のデータの受け渡し

#### 親→子
親側
呼び出し部分に与える値を代入する。v-bindを使用してvueで定義したものをあげる
属性名となるのでケバブケースで書くのが望ましい
```
<LikeNumber :total-number="number"></LikeNumber>
```

子側
もらう値を配列としてpropsに登録する。
キャメルケースで書くのが望ましい
propsは配列ではなく型を定義してオブジェクトでも書ける。（これはバリデーションとなる。）
```
export default {
    props: ["totalNumber"],
};

export default {
    props: {
        totalNumber: {
            type: String,
            required: true,
        }
    },
};
```
propsで指定した値はvueインスタンス内でthis.値名でアクセス可能

##### slot
※HTMLごと送りたい場合
親側
```
<LikeHeader>
    <h1>トータルのいいね数</h1>
    <h2>{{ number }}</h2>
</LikeHeader>
```
子側
```
<template>
    <div>
        <slot></slot>
    </div>
</template>
```
slotを使うことで親側の好きなHTMLを子側に送ることができる。
親側に書いたslotに埋め込まれるHTMLは、親側と子側両方からのCSSを適応させることができる。
（両方に書いた場合親の方が優先される）
また、slot内に何かしらのHTMLを予め書いておくと、親側でslotに対して指定されなかったとき、デフォルトとしてslot内のものが表示される。このことをフォールバックコンテンツという。

- 複数のslotを使うとき
親側
templateタグで囲み、v-slotディレクティブで適応させたいslotのname属性を指定する。
templateタグ以外だとエラーになるので注意。
```
<LikeHeader>
    <template v-slot:title>
        <h1>トータルのいいね数</h1>
    </template>
    <template v-slot:number>
        <h2>{{ number }}</h2>
    </template>
</LikeHeader>
```

- 動的にslotを使いたいとき
大括弧を用いる
```
v-slot:[title]
```

- slotの省略記法
v-slot:は#にできる
```
<template #number>
```

子側
```
それぞれにslotに対してname属性を指定する。
これを名前付きslotという。
<template>
    <div>
        <slot name="title"></slot>
        <slot name="number"></slot>
    </div>
</template>
```
名前を付けなかったslotはデフォルトslotといい、親要素でv-slotを持つtemplate外に書いたものが全て適応される。
内部的にはVueがv-slot:defaultを生成してそこにtemplate外の要素を上から入れていくような形になる。

#### 子→親
子側
$emitを使用して名前をつけて、送る値を定義する。
```
methods: {
    increment() {
        this.$emit("my-click", this.number + 1);
    },
},
```
$emitは好きなタイミングでカスタムイベントを作成し、それを発火できるもの。
属性名となるためカスタムイベント名はケバブケースで記述する。


親側
呼び出している箇所にv-onを使用して、カスタムイベントが実行されたときの処理を行う。
$eventとして取り出せる。
```
<LikeNumber :number="number" @my-click="number = $event"></LikeNumber>
```

##### slotを用いた送信方法
子側
slotタグにv-bindを用いて任意の属性に、渡したいデータを入れる。
```
<template>
    <div>
        <slot name="title" :user="user"></slot>
    </div>
</template>

<script>
    export default {
    data() {
        return {
        user: {
            firstName: "Jack",
            lastName: "Donald",
        },
        };
    },
};
</script>
```

親側
v-slotバインディングに任意の値を持たせて、それを出力することができる。
名前はなんでもいい。
```
<LikeHeader>
    <template v-slot:title="slotProps">
        {{ slotProps }}
    </template>
</LikeHeader>
```

デフォルトslotで使う場合は下記のように省略記法がある。
template内に書かず、:defaultを指定する必要もない
```
<LikeHeader v-slot="slotProps">
```
#を使う場合はちょっと特殊
```
<LikeHeader #default="slotProps">
```

### コンポーネントの動的切り替え
componentタグを使う。
下の例で言うとcurrentComponentを@clickなどで動的に変えることで表示されるコンポーネントを変化させたりできる。
```
<component :is="currentComponent"></component>
```
デフォルトだとcomponentで生成されたものを切り替えるたびにHTMLは再生成されるので、フォームなどの入力値は消えてしまう。
それを防ぐためにはkeep-aliveで囲む
```
<keep-alive>
    <component :is="currentComponent"></component>
</keep-alive>
```
keep-aliveを使用したときに、表示・非表示のライフサイクルフックが存在する。
activated()とdeactivated()で確認することができる。
```
export default {
    activated() {
        console.log("activated");
    },
    deactivated() {
        console.log("deactivated");
    },
};
```

## V-Model
### v-modelの修飾子
それぞれv-modelが発火するタイミングが違う
- v-model.lazy...フォーカスが外れたときに反映される（いちいち反映させたくないときに使う）
- v-model.number...インプット内の数値は通常Stringになってしまうが、それを防いでずっと数値型としてくれるもの。
- v-model.trim...文頭と末尾の空白を削除する。

### 複数のcheckboxを使うときのv-model
単体のcheckboxを使うときはBoolを指定したが、複数の場合は配列を指定することで、その配列にValueが入る。

### SelectBox
```
<select v-model="eventData.location">
    <option v-for="location in locations" :key="location">{{ location }}</option>
</select>
<p>{{ eventData.location }}</p>

export default {
    data() {
        return {
            locations: ["東京", "大阪", "名古屋"],
            eventData: {
                location: "東京",
            },
        };
    },
```
### v-modelの中身
v-modelの中身は下記に等しい
```
<input :value="eventData.title" @input="eventData.title = $event.target.value" />
```

### コンポーネントでv-modelを使用する場合
親側
```
<EventTitle v-model="eventData.title"></EventTitle>
```
v-modelの中身で説明すると、親側は下記のようなものになる。
子側から$emitで送られたものは$eventで取り出せるので、eventData.titleにはそれを与えている。
結果上記のv-modelを使用することで親側は子側のを受け取れる。
```
<EventTitle :input="eventData.title" @input="eventData.title = $event"></EventTitle>
```

子側
```
<template>
    <div>
        <input id="title" type="text" :value="value" @input="$emit('input', $event.target.value)" />
        <p>{{ value }}</p>
    </div>
</template>

<script>
export default {
    props: ["value"],
};
</script>

```

## CustomDirective
### カスタムディレクティブを追加する
1. main.jsにディレクティブを登録する
borderの部分はディレクティブ名となり、v-ディレクティブ名となる名前を入れる。
フック関数と呼ばれる引数を5つ取ることができ、全て必要ではなく、ディレクティブの挙動を定義するために使う。
```
Vue.directive("border", {
    bind(el, binging, vnode) {
        // ディレクティブが初めて対象の要素に紐付いたとき
    },
    inserted(el, binging, vnode) {
        // 親Nodeに挿入されたとき
    },
    update(el, binging, vnode, oldVnode) {
        // コンポーネントが更新される度、子コンポーネントが更新される前
        // （親の更新の影響を受けて、子に更新が行く前ということ）
    },
    componentUpdated(el, binging, vnode, oldVnode) {
        // コンポーネントが更新される度、子コンポーネントが更新された後
    },
    unbind(el, binging, vnode) {
        // ディレクティブが紐付いている要素から取り除いたとき
    },
});
```
#### 省略記法
フック関数は基本的にbindとupdateが主に使われるため、その2つには省略記法がある。
また、bindとupdateは同じような処理を書くことが多い。
そのため2つをまとめて1つの関数として定義する。
（vnodeとoldVnodeも取れるがあまり使わないので記述していない）
```
Vue.directive("border", function(el, binging) {

}
});
```

#### ローカル登録
上記のmain.jsに記述するのはグローバルに登録しているので、どのコンポーネントからも使える。
特定のコンポーネントからのみ使えるようにするには、コンポーネント内で以下を書く。
```
<script>
export default {
    directives: {
        border(el, binding) {
            el.style.border = "solid black 2px";
            el.style.borderWidth = binding.value.width;
            el.style.borderColor = binding.value.color;
            el.style.borderStyle = binding.arg;
        },
    },
};
</script>
```

#### elとbinding
- el...ディレクティブが紐付いている要素を示す
elを使ってjavascriptのDOM操作で要素を変えていく
- binding...binding.valueでディレクティブの値を受け取れる。値に文字列を渡したいときは下記のように注意する。
```
<template>
    <p v-border="'5px'">Home</p>
</template>
~~~~~~~~~~~~~~~~
Vue.directive("border", function(el, binding) {
    el.style.border = "solid black 2px"
    el.style.borderWidth = binding.value
}
});

複数の値を渡したいときはオブジェクトにする。
<template>
    <p v-border="{width: '5px', color: 'red'}">Home</p>
</template>
~~~~~~~~~~~~~~~~
el.style.borderWidth = binding.value.width;
el.style.borderColor = binding.value.color;
```

引数をとりたいとき
binding.argで指定する
```
<p v-border:dotted="{width: '5px', color: 'red'}">Home</p>
~~~~~~~~~~~~~~~~
el.style.borderStyle = binding.arg;
```

修飾子（引数にドットで繋がっているやつ）をとりたいとき
ifの条件式はそのままTrueかFalseを返す。修飾子はあるときとないときがあるからifであるときだけ変えるように設定する。
```
<p v-border:solid.round.shadow="{width: '5px', color: 'red'}">Home</p>
~~~~~~~~~~~~~~~~
Vue.directive("border", function (el, binding) {
    if (binding.modifiers.round) {
        el.style.borderRadius = "0.5rem"
    }
    if (binding.modifiers.shadow) {
        el.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.26)"
    }
});
```

#### カスタムディレクティブ内ではthisは使えない
thisを使ってdataなどの値を取ることはできないので注意する。

## Filter and Mixin
### Filter
文字列をフォーマットしてくれるもの。わざわざcomputedを作る必要がない

main.js
```
Vue.filter("upperCase", function(value) {
    return value.toUpperCase();
})
```

template内
```
<div>
    <h2>{{ title | upperCase }}</h2>
</div>
```

#### ローカルに登録する場合
登録したいコンポーネントに以下を記述する。
```
filters: {
    lowerCase(value) {
        return value.toLowerCase();
    }
}
```

#### 複数のフィルターを連結させるとき
さらにパイプを繋げる。左側から順に適応されていくので、下記はlowerCaseが適応された形になる。
```
<h2>{{ title | upperCase | lowerCase }}</h2>
```

#### フィルターではthisを使えない
もし使いたいときはcomputedかmethodsを使う。

#### computedとの違い
methodsと同じく関係ない再描画の度に実行される。

### Mixin
コードの再利用をする。

共通化したい部分をsrcフォルダの.jsファイルとして書く
tokyoNumber.js
```
export const tokyoNumber = {
  data() {
    return {
      title: "Welcome to Tokyo",
      number: 0,
    };
  },
  filters: {
    lowerCase(value) {
      return value.toLowerCase();
    },
  },
};
```

使用したいコンポーネントでimportする。
mixinsの配列でimportしたものを指定すると使えるようになる。
```
import { tokyoNumber } from "@/tokyoNumber";

export default {
  mixins: [tokyoNumber],
};
```
コンポーネント側とmixin側で競合した場合はコンポーネントが優先される。

#### グローバル化
全てのVueインスタンスにMixinがマージされるので使用する際は注意して使う。
main.jsに記述する。
```
Vue.mixin({
    # ここに記述する
})
```

## Transition and Animation
### Transition
transitionタグは基本的に中には一つの要素しか入れてはいけない。
ただし最終的に出力されるのが一つという意味で、if文があって最終的に出力されるのが1つならば複数あってもよい。
nameにfadeをつけることでstyleでfadeのタイミングとイベントを調整できる
実際内部ではそのアクションが行われたときにfade-enterなどのクラスをつけたり外したりして調整している。
```
<div>
    <button @click="show = !show">change</button>
    <transition name="fade">
        <p v-if="show">hello</p>
    </transition>
</div>

<style scoped>
.fade-enter {
  /* 現れるときの最初の状態 */
  opacity: 0;
}
.fade-enter-active {
  /* 現れるときのトランジションの状態 */
  transition: opacity 0.5s;
}
.fade-enter-to {
  /* 現れるときの最後の状態 */
  opacity: 1;
}
.fade-leave {
  /* 消えるときの最初の状態 */
  opacity: 1;
}
.fade-leave-active {
  /* 消えるときのトランジションの状態 */
  transition: opacity 0.5s;
}
.fade-leave-to {
  /* 消えるときの最後の状態 */
  opacity: 0;
}
</style>
```

Transition and Animationの以降一旦pass

## Router
vue-routerのインストール
```
$ npm install vue-router
```

RouterとはURLと表示するページを関連付けるもの、SPAに使われる。
設定をmain.jsと同じディレクトリにrouter.jsを作成して記述する。main.jsに書いてもいいが、長くなるのでこうやって分割しておく。

router.js
```
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Users from './views/Users.vue'

Vue.use(Router)
// useはプラグインを適応させる。プラグインとはVueプロジェクトに対してグローバルで使えるものを指す。
export default new Router({
  routes: [
    { path: '/', component: Home },
    { path: '/users', component: Users }
  ]
})
```

routerで使用するページを./viewsフォルダを作成し、そこにVueファイルを作成してRouterでインポートしていく。
当然main.jsで適応させる必要がある。
```
import router from './router.js'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```
vueインスタンスにrouterを登録している
（省略記法を使っているので実際書いているのはrouter: routerとなる。）

実際にルーティングを適応させるには表示されるVueであるApp.vueにRouterを読み込ませる。
App.vue
```
<template>
  <div>
    <router-view></router-view>
  </div>
</template>
```
router-viewは動的コンポーネントのような振る舞いをする。
なので内部的にはURLを変えることによってJS側で表示する内容を変えており、サーバー側で変えたりはしていない。

### シャープについて
上記の方法でページを変えるとURLにシャープがつく。
これはSPAである証拠で、実際にはlocalhost:8080にアクセスしているだけで、シャープ以降の文字列によってコンポーネントを変化させているという意味になる。

### Historyモード
シャープを消す方法がある。それがHistoryモードであって、今まではHashモードとなっている。
router.js
```
export default new Router({
  mode: "history",
  routes: [
    { path: '/', component: Home },
    { path: '/users', component: Users }
  ]
})
```
すると、URLとしてはlcalhost:8080/usersなどにアクセスしているが、Vue側は/usersであってもindex.htmlを返すようになる。
（静的ホスティングサービスを利用するときは/usersなどにアクセスしたらindex.jsを返すみたいな設定は自分で書く必要がある。）
設定例：https://router.vuejs.org/ja/guide/essentials/history-mode.html

### router-link
普通にaタグでページ内のリンクを作るといちいちアクセスし直すことになる。
変化した部分だけ変化させれば1番効率的。
```
<router-link to="/">Home</router-link>
<router-link to="/users">Users</router-link>
```
router-linkを使うことで変化したところだけを変化させる。
デフォルトだと出力後はaタグになっており、buttonなどにしたい場合はtagを指定する。
```
<router-link to="/" tag="button">Home</router-link>
```

#### active-class
現在のページがrouterリンクのページのときに、特定のスタイルを適応させたいときに使う。
```
<router-link to="/" class="link" active-class="link--active">Home</router-link>
<style>
  .link--active {
    font-size: 20px;
  }
</style>
```
上のままだと、現在のURLに内包される全ての親Pathも適応されてしまうので、厳密にそのURLだけに適応させたいときはexactを使う
```
<router-link to="/" class="link" active-class="link--active" exact>Home</router-link>
```

#### router-linkを使わないでJsでRouterリンクを作る方法
```
<template>
  <div>
    <h3>Home</h3>
    <button @click="toUsers">Go to Users</button>
  </div>
</template>

<script>
export default {
  methods: {
    toUsers() {
      this.$router.push("/users");
    },
  },
};
</script>
```

### 動的なURLを作る
router設定に任意のサフィックスを書く
```
routes: [
    { path: '/', component: Home },
    { path: '/users/:id', component: Users }
  ]
```
この時点で任意のサフィックスを付与したURLにはアクセスできる。

ページの内容をこの場合だと:idに応じて変化させるには$routeを使う
（$routerではないことに注意、$routeは現在の情報を取得するときにつかう）
```
<h1>User No. {{ $route.params.id }}</h1>
```
パラメーターの変化はコンポーネントを使いまわして行っているので、変化時にライフサイクルフックが呼ばれないことに注意する

#### propsを使って再利用性を高める
router.jsにて
```
{ path: '/users/:id', component: Users, props: true }
```
propsをtrueにし、使う場所で
```
<h1>User No. {{ id }}</h1>

<script>
export default {
  props: ["id"],
};
</script>
```
こうすることで、違うところでこのコンポーネントを使いたいときに再利用できる。（コンポーネントはRouter関係なくなっているので）

### ネストしたURLを作る
pathの部分は/pathとしてしまうと、childrenとしてネストできないので付けないもしくは最後につける。
```
import UsersPosts from './views/UsersPosts.vue'
import UsersProfile from './views/UsersProfile.vue'

export default new Router({
  mode: "history",
  routes: [
    { path: '/', component: Home },
    {
      path: '/users/:id',
      component: Users,
      props: true,
      children: [
        { path: "posts/", component: UsersPosts },
        { path: "profile/", component: UserProfile }
      ]
    }
  ]
})
```

### toを動的に利用する
:toをつかう
```
<router-link :to="'/users/' + (Number(id) + 1) + '/profile'">次のユーザー</router-link>
```

nameを使用したPathに対しては以下のように書ける
```
<router-link :to="{ name: 'users-id-profile', params: {id: Number(id) + 1}}">次のユーザー</router-link>
```
router.js
```
{ path: "profile/", component: UsersProfile, name: 'users-id-profile' }
```

この指定方法はpush内でも使えたりする
```
<script>
export default {
  methods: {
    toUsers() {
      this.$router.push({
        name: "users-id-profile",
        params: { id: 1 },
      });
    },
  },
};
</script>
```

queryも指定できる
```
:to="{ name: 'users-id-profile', params: {id: Number(id) + 1}, query: {lang: 'ja'}}"
```

### 名前付きビュー
固定ヘッダーなどによく使うことができる

componentをcomponentsにして、defaultとheaderで使うコンポーネントを指定する。(headerは次の項目で定義した)
名前付きビューを使うときはpropsをオブジェクトとして定義することに注意する。
router.js
```
import HeaderHome from './views/HeaderHome.vue'
import HeaderUsers from './views/HeaderUsers.vue'

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      components: {
        default: Home,
        header: HeaderHome
      }
    },
    {
      path: '/users/:id',
      components: {
        default: Users,
        header: HeaderUsers
      },
      props: {
        default: true,
        header: false
      },
      children: [
        { path: "posts/", component: UsersPosts },
        { path: "profile/", component: UsersProfile, name: 'users-id-profile' }
      ]
    }
  ]
})
```

router-viewでnameを指定して呼び出す
```
<router-view name="header"></router-view>
```

### リダイレクトの使い方
```
{
  path: "/hello",
  redirect: { path: "/"},
}
```
pathに*を指定すると、定義されていないURLに対して全て定義できるので便利
よく使うらしい
```
{
  path: '*',
  redirect: '/'
}
```

### 特定のIDを持つ要素までスクロールさせる
特定のIDの要素までスクロールさせるには、ブラウザ上の使用としてURLに#idを付けてあげればそこまでスクロールしてくれる。
ただし、Vueの場合はスクロールの振る舞いを指定してあげないと、スクロールしてくれない。
scrollBehavior関数を使って定義する。
selectorを使うことでid指定でその要素まで飛ばせる
```
export default new Router({
  mode: "history",
  routes: [
    ~~~~~~~~~~~~~~~~~
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      selector: '#next-user'
    };
  }
})
```

to, from, savedPositionの3つの引数を取ることができ、
toは遷移先のページ情報があり、fromは遷移前のページ情報があり、
savedPositionはページから別のページに行き、そのページから最初のページに戻ったときに、スクロール場所を保持するときに使う

```
scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  }
}
```

ただし、これは一瞬でページが切り替わるときのみであり、Transitionを指定していたときなどすぐにページが切り替わらないときは別途指定が必要
発展なので割愛

### ナビゲーションガード
ページ遷移の際に特定の処理を挟むことをいう。

#### グローバルに実装
beforeEachを使う
to,fromは遷移先、遷移前のページ情報
nextはnext();として次のページに行くという処理を書く必要がある。
next(false);で遷移しない、next({path: ---});でnamedパス指定でとばせたりする。
main.js
```
router.beforeEach((to, from, next) => {
  next();
})
```

#### ローカルに実装
##### router.jsに指定
beforeEnterを使う
beforeEachと変わらない
```
{
  path: '/',
  components: {
    default: Home,
    header: HeaderHome
  },
  beforeEnter(to, from, next) {
    next();
  }
},
```
##### コンポーネントに指定する
コンポーネントで使用するメリットはthisが使える
3つ関数がある
BeforeRouteEnterではthisは基本的に使えないが特殊な書き方で使える
Vueインスタンスが生成されて、thisが使えるようになったときの処理をnext内に書くことができる
```
<script>
export default {
  props: ["id"],
  beforeRouteEnter(to, from, next) {
    // Vueインスタンスが作成される前の処理を書くことができる
    next((vm) => {
      console.log(vm.id);
    });
  },
  beforeRouteUpdate(to, from, next) {
    // URLが変わったけどVueインスタンスが変わらない、ネストされたページに入ったときに使う
    next();
  },
  beforeRouteLeave(to, from, next) {
    // ページを離れたときに使う
    next();
  },
};
</script>
```

### 遅延ローディング
コンポーネントが多数になると、読み込むファイルの数が多くなり、SPAだと最初に全てのファイルを持ってくるため読み込みが遅くなる。
これを防ぐためにWebpack側の機能を使って、必要なファイルだけ読み込むことができる。
基本的にこの書き方をするのが望ましい。

router.js
```
import Home from './views/Home.vue'
```
となっていたものを
```
const Home = () => import('./views/Home.vue');
```
とする。

ただしVueCLI3ではPrefetchという機能があり、これは次のページに必要なファイルをDLするというもの。
これがあるせいで効果がないように見えるがPrefetchはインターネット通信の手が空いているときに行われるため
（例えばリクエストを送ってレスポンスを待っているときなど）
効率的な通信で実現されている。それはブラウザのキャッシュに保持しておき、使用する際はそこから参照することでページを表示させている。


## Vuex
### 初期設定
コンポーネント間のデータの受け渡しにVuexが仲介し、スムーズにするもの。
プロジェクトに移動し、インストール
```
$ npm instal vuex
```

main.jsと同じディレクトリにstore.jsを作成し、ここに設定を書く。
store.js
```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 2
    }
})

```

main.jsで有効化する
```
import store from './store.js'

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
```

これで全てのコンポーネントからstateのcountにアクセスすることができるようになった。

### 基本的な使用例
computedで呼ぶのが望ましい
```
<template>
  <div>
    <p>{{ count }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.state.count;
    },
  },
};
</script>
```

### getter
共通して使えるちょっとした関数を定義するときに便利

store.js
```
export default new Vuex.Store({
    state: {
        count: 2
    },
    getters: {
        doubleCounter: state => state.count * 2
    }
})
```

使う側
```
<template>
  <div>
    <h3>Home</h3>
    <button @click="toUsers">Go to Users</button>
    <p>{{ count }}</p>
    <p>{{ doubleCounter }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.state.count;
    },
    doubleCounter() {
      return this.$store.getters.doubleCounter;
    },
  },
  .....
```

getterはmapGettersを使って簡潔に書ける
...はスプレッド演算子でオブジェクト内にオブジェクトをマージさせている
```
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    count() {
      return this.$store.state.count;
    },
    ...mapGetters(["doubleCounter"]),
  },
```

### mutation
上記のような書き方でcomputedなどに色々書いていると、値を変えているのか参照しているのかがわからない。
Vuexでは基本的に値を変える処理はmutationに書くのが望ましい。
mutationの処理はふつう同期的な処理しか書くべきではない、非同期的な処理にすると煩雑になってしまうから。

store.js
```
export default new Vuex.Store({
    state: {
        count: 2
    },
    mutations: {
        increment(state, number) {
            state.count += number
        }
    }
})
```

使う側
```
methods: {
  increment() {
    this.$store.commit("increment", 2);
  }
}
```
gettersと同様に省略記法がある
引数はHTML側に書く
```
<button @click="increment(2)">

import { mapMutations } from "vuex";
........

methods: {
  ...mapMutations(["increment"])
}
```

## action
mutationに対してactionがあり、こちらは非同期的な処理を書くべき場所
下記のようなmutationをactionで呼んで、そのactionを呼び出すこともできる。
actionを挟むのか挟まないのかはプロジェクトの方針次第

store.js
```
export default new Vuex.Store({
  actions: {
      increment(context) {
          context.commit('increment');
      }
  }
})
```

使う側
```
methods: {
  increment() {
    this.$store.dispatch("increment", 2)
  }
}
```

gettersと同様に省略記法がある
引数はHTML側に書く
```
<button @click="increment(2)">

import { mapActions } from "vuex";
........

methods: {
  ...mapActions(["increment"])
}
```

以降のVuexは割愛


##
