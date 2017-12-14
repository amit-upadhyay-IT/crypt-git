# crypt-git [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Got some important files which you don't want to share publicly but still want to use github as VCS for your softwares. Crypt-git can help you.


crypt-git is a command line utility written in node.js which enables to encrypt important files when you push them on GitHub repo and decrypt then when you want to work locally on your system. Doing this is very very simple with 'crypt-git'.

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

See an example [here](https://github.com/amit-upadhyay-IT/crypt-git/blob/master/.cryptfiles), this encrypts all the files named `amit.txt` in the repo.


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

When you want to work locally with your repository (without any encrypted file) then all you need is:
```
cg decrypt
```
NOTE: cg is abbreviation for crypt-git

When you perform `cg decrypt`, the encrypted file gets decrypted on your local machine.

Cool right?

## Usage

```js
$ cg push <commit message> // to push with the encrypted content.

cg decrypt // to decrypt the encrypted files
```
To know more read [this](https://github.com/amit-upadhyay-IT/crypt-git#documentation).


## NOTE:

Nothing important here that you don't already know.

## About branches

- The `supreme` branch creates different .iv file for each encryption.

- The `master` branch has static .iv file which gets created once (for the first time).

## Release improvements

**first release (v1.0.0)**
- It works fine for all cases except one case which you may need to handle properly.
- If you perform two `cg push` operations one after the other without making any changes then the content of `.iv` file would get changed which will result in improper decryption thus you may face problem in decompression.
- If you ever encounter any such problem just re-clone the project and do `cg pull`. Things will be fine.

**Olympian release (v1.5.0)**
- This release takes care of commit history, because now every push doesn't create a new encryption pattern into the file, So all the files doesn't gets changes. This doesn't make the commit history improper. To know more about this release see [this](https://github.com/amit-upadhyay-IT/crypt-git/releases/tag/v1.5.0)

**Sovereign release (v1.6.0)**
- The command `cg pull` is replaced with `cg decrypt`.
- In this release `git pull` is not being performed because it is not required. The decryption process is done using the `.iv` file, which is available locally (so why to fetch again?), in case the file is deleted somehow, the user is asked to clone the repo and try decrypting again.

**Chief release**
- Yet to come.
- Major changes (**TODO**):
1) Ability to perform encryption of files with match of the regular expressions (this will help encryption of multiple files with same extension and irrespective of their names).
2) The `.cryptfiles` can take several lines of input and the each file or file path will get encrypted.


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
