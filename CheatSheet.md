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
