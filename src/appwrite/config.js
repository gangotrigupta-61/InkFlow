import conf from '../conf/conf.js';

import { Client, ID, Databases, Storage, Query} from 'appwrite'


export class Service{
    client = new Client();
    Databases;
    bucket;

    constructor(){

        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.Databases= new Databases(this.client);

    }

    async createPost({title,slug,content,featuredImage, status, userId}){
        try{
            return await this.Databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
         )
        }

        catch(error){
            console.log("Appwrite serive::createPost::error", error);
        }

    }


    async UpdatePost(slug,{title, content, featuredImage, status}){
        try{
            return await this.Databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,{
                    title, 
                    content,
                    featuredImage,
                    status,
                }
            )

        }
        catch(error){
            console.log("Appwrite serive:: updatepost::error", error);
        }
    }

    async deletePost(slug){
        try{
         await this.Databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
         )
          return true

        }
        catch(error){
            console.log("Appwrite serive :: deletepost::error", error);
            return false;
        }
    }


    async getPost(slug){

         try{
          return await this.Databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
        }

        catch(error){
            console.log("Appwrite Serive :: getpost:: error", error);
            return false;
        }
        
    }

    async getPosts(queries=[Query.equal("status","active")]){

        try{
          return await this.Databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
         )
    }

        catch(error){
          console.log("Appwrite Serive :: getPosts::error", error);
          return false;
        }
    }


    // FILE UPLOAD SERVICE

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
               conf.appwriteBucketId,
               ID.unique(),
               file
            )
            
        } catch (error) {
           console.log("Appwrite serive :: uploadfile::error", error) ;
           return false;
        }
    }

    async deleteFile(fileID){
        try {
             await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID
            )
            return true 
        } 

        catch (error) {
            console.log("Appwrite serive :: deleteFile:: error", error);
            return false;
        }
    };

// we do not need async  as file preview is very fast

getfilepreview(fileID){
    return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileID
    )
}

}

const service= new Service();
export default service;


