# na2hiro/uploader
## 何
HTML5とか使ったアップローダ

## 特徴

* ドラッグ&ドロップでアップロード
* 中断しても次投げ込めば続きから再開できる(レジューム)

## メモ

* 何も表示されないのは正しい
* 権限とか何も考えずにレジューム実装できた
    * ファイル名にファイルサイズを含めることでアップロード済みかどうか判断
    * ファイル名もファイルサイズも同じファイルを同時にupしなければ壊れないはず
* 1MBずつ切って処理するので1GBのファイルでもupできる

## 使ったHTML5

* File API
* DnD API
* WebSocket
* Progress要素

## 対応

* Chrome: ok
* Opera: Macではローカルファイル開こうとすると死ぬけどWinでは動いたらしい
* Firefox: 少し方言喋ったので対応した
* Safari, Sleipnir: 方言喋ってたのとベンダプレフィックスつけてたので対応した

IEェ

## 依存

* node
* express
* websocket.io
