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

#### To decrypt:

When you want to work remotely with your repository (without any encrypted file) then all you need is:
```
cg decrypt
```
NOTE: cg is abbreviation for crypt-git

When you perform `cg decrypt`, the encrypted file are being decrypted on your local machine.

Cool right?

## Usage

```js
$ cg push <commit message> // to push with the encrypted content.

cg decrypt // to decrypt the encrypted files
```
To know more see [this](https://github.com/amit-upadhyay-IT/crypt-git#documentation).


## NOTE:

Nothing important here that you don't already know.

## About branches

- The `supreme` branch creates different .iv file for each encryption.

- The `master` branch has static .iv file which gets created once (for the first time).

## Release improvements

**Olympian release (v1.5.0)**
- This release takes care of commit history, because now every push doesn't create a new encryption pattern into the file, So all the files doesn't gets changes. This doesn't make the commit history improper. To know more about this release see [this](https://github.com/amit-upadhyay-IT/crypt-git/releases/tag/v1.5.0)


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
