const fs = require('fs')


try {
    // Create and write file
    fs.writeFileSync("Sync.txt", "Hi I am yashwanth, This message is from Sync.js file.")
    console.log("File is written successfully")

    // Read file
    const read_data = fs.readFileSync("Sync.txt", "utf-8")
    console.log("Read the file successfully:", read_data)

    // Append data
    fs.appendFileSync("Sync.txt", `\n\nAppend Method: This line is added using appendFileSync. ${new Date().toLocaleString()}`)
    console.log("File is appended successfully")

    // Rename file
    fs.renameSync("Sync.txt", "Sync-Method.txt")
    console.log("File renamed successfully")

    // Check if file exists
    if (fs.existsSync("Sync-Method.txt")) {
        console.log("File exists")
    } else {
        console.log("File not exists")
    }

    // Create folder
    fs.mkdirSync("Sync-Folder", { recursive: true })
    console.log("Folder created successfully")

    // Read folder
    const files = fs.readdirSync(".")
    console.log("Files in current directory:", files)


    //Copy the text file created into the some other directory

    fs.cpSync("Sync-Method.txt", "SyncMethodCopiedVersion.txt")
    console.log("File copied successfully")

    // // Delete file
    // fs.unlinkSync("Sync-Method.txt")
    // console.log("File deleted successfully")

    // // Delete folder
    // fs.rmdirSync("Sync-Folder", { recursive: true })
    // console.log("Folder deleted successfully")

} catch (err) {
    console.error("Error:", err)
}