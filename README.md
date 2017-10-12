# crypt-git [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Got some important files which you don't want to share publicly but still want to use github as VCS for your softwares. Crypt-git can help you.


crypt-git is a command line utility written in node.js which enables to encrypt important files when you push them on GitHub repo and decrypt then when you want to work remotely. Doing this is very very simple with 'crypt-git'.

## Installation

Install the module globally:

```sh
$ npm install -g crypt-git
```

## Documentation

You just need to maintain a file `.cryptfiles` where you need to specify the `file name(s)` which you want to encrypt.

##### create .cryptfiles file:
`touch .cryptfiles`

##### edit .cryptfiles file
`vim .cryptfiles`

See an example [here](https://github.com/amit-upadhyay-IT/crypt-git/blob/master/.cryptfiles)


#### To push:
```
$ cg push <commit message>
```

- `<commit message>` is optional.

The above command is equivalent to doing these operations:

- `git add -A`
- `git commit -m'your message'`
- `git push -u origin master`

Now all your important files mentioned in `.cryptfiles` file are pushed on your repository in encrypted (and compressed) form.

#### To pull:

When you want to work remotely with your repository then all you need is:
```
cg pull
```
NOTE: cg is abbreviation for crypt-git

The above command is equivalent to:
```
git pull
```

Cool right?

## Usage

```js
$ cg push <commit message> // to push

cg pull // to pull
```
To know more see [this](https://github.com/amit-upadhyay-IT/crypt-git#documentation).


## NOTE:

- It is important to do `cg pull` after every `cg push` if you want to continue working remotely, because after long time span you may forget to perform `cg pull` (i.e. decrypting of your important files) and you may perform `cg push` again(which will lead in change of iv) which will cause problem in decryption of files because the iv will get replaced by a new random 16 bytes. Automating it is not a big deal and this will be taken care in next release.
- When you do `cg push`, all the files are encrypted again with the newly generated 'iv' which leads changes in all the encrypted files. Thus while commiting them the unchanged files also get added. So this creates improper commit history on git.

## About branches

The `supreme` branch creates different .iv file for each encryption. The master branch has static .iv file which gets created once (for the first time).


## License

Apache-2.0 © [Amit Upadhyay](https://github.com/amit-upadhyay-IT)


[npm-image]: https://badge.fury.io/js/crypt-git.svg
[npm-url]: https://npmjs.org/package/crypt-git
[travis-image]: https://travis-ci.org/amit-upadhyay-it/crypt-git.svg?branch=master
[travis-url]: https://travis-ci.org/amit-upadhyay-it/crypt-git
[daviddm-image]: https://david-dm.org/amit-upadhyay-it/crypt-git.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/amit-upadhyay-it/crypt-git
[coveralls-image]: https://coveralls.io/repos/amit-upadhyay-it/crypt-git/badge.svg
[coveralls-url]: https://coveralls.io/r/amit-upadhyay-it/crypt-git
