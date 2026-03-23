const fs = require('fs').promises;

async function fileOperations() {
    try {
        // Create and write file
        await fs.writeFile("Async.txt", "Hi I am yashwanth, This message is from Async.js file.")
        console.log("File is written successfully")

        // Read file
        const read_data = await fs.readFile("Async.txt", "utf-8")
        console.log("Read the file successfully:", read_data)

        // Append data
        await fs.appendFile(
            "Async.txt",
            `\n\nAppend Method: This line is added using appendFile. ${new Date().toLocaleString()}`
        )
        console.log("File is appended successfully")

        // Rename file
        await fs.rename("Async.txt", "Async-Method.txt")
        console.log("File renamed successfully")

        // Check if file exists
        try {
            await fs.access("Async-Method.txt")
            console.log("File exists")
        } catch {
            console.log("File not exists")
        }

        // Create folder
        await fs.mkdir("Async-Folder", { recursive: true })
        console.log("Folder created successfully")

        // Read folder
        const files = await fs.readdir(".")
        console.log("Files in current directory:", files)

        // Copy file
        await fs.copyFile("Async-Method.txt", "AsyncMethodCopiedVersion.txt")
        console.log("File copied successfully")

        // // Delete file
        // await fs.unlink("Async-Method.txt")
        // console.log("File deleted successfully")

        // // Delete folder
        // await fs.rm("Async-Folder", { recursive: true, force: true })
        // console.log("Folder deleted successfully")

    } catch (err) {
        console.error("Error:", err)
    }
}

fileOperations();