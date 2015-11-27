/**
 * Created by liuqingling on 15/11/26.
 */
var Loger= {
    datas:null,//datas need write
    directory:"log",//default directory
    fileName:"stores.txt",//default file name
    write:function (data,directory,fileName){
    this.datas=data;
    this.directory=directory;
    this.fileName=fileName;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.onFileSystemSuccess, this.onFileSystemFail);
},

//获取mobovip目录，如果不存在则创建该目录
    onFileSystemSuccess:function (fileSystem) {

    var newFile = fileSystem.root.externalRootDirectory(directory, {
        create : true,
        exclusive : false
    }, this.onDirectorySuccess, this.onFileSystemFail);
},
//获取mobovip目录下面的stores.txt文件，如果不存在则创建此文件
    onDirectorySuccess:function (newFile) {

    newFile.getFile(this.fileName, {
        create : true,
        exclusive : false
    }, this.onFileSuccess, this.onFileSystemFail);
},
/**
 * 获取FileWriter对象，用于写入数据
 * @param fileEntry
 */
onFileSuccess:function (fileEntry) {
    fileEntry.createWriter(this.onFileWriterSuccess,this.onFileSystemFail);
},

/**
 * write datas
 * @param writer
 */
onFileWriterSuccess:function (writer) {
//  log("fileName="+writer.fileName+";fileLength="+writer.length+";position="+writer.position);
    writer.onwrite = function(evt) {//当写入成功完成后调用的回调函数
        console.log("write success");
    };
    writer.onerror = function(evt) {//写入失败后调用的回调函数
        console.log("write error");
    };
    writer.onabort = function(evt) {//写入被中止后调用的回调函数，例如通过调用abort()
        console.log("write abort");
    };
    // 快速将文件指针指向文件的尾部 ,可以append
//  writer.seek(writer.length);
    writer.write(this.datas);//向文件中写入数据
//  writer.truncate(11);//按照指定长度截断文件
//  writer.abort();//中止写入文件
    },

    onFileSystemFail:function (error) {
        alert(error.code);
    console.log("Failed to retrieve file:" + error.code);
}
}
