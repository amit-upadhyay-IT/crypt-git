## Releases

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

