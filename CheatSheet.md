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
