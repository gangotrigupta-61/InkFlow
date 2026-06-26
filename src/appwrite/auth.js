import conf from '../conf/conf.js';
import { Client, Account, ID } from 'appwrite';


// direct snippet to use but we will write quality code

// import { Client, Account, ID } from "appwrite";

// const client = new Client()
//     .setProject('<PROJECT_ID>') // Your project ID
//     .setEndpoint('https://<REGION>.cloud.appwrite.io/v1');

// const account = new Account(client);

// try {
//     const user = await account.create({
//         userId: '[USER_ID]',
//         email: 'email@example.com',
//         password: '<Password>'
//     });
//     console.log(user)
// } catch (e){
//     console.error(e)
// }


// Form class and then list all methods in it 

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.account= new Account(this.client);
    }

    // Now we will form various methods for login logout email password 

    async createAccount({email, password, name}){

        try {
            const userAccount = await this.account.create(
                ID.unique(), email, password, name);

            if(userAccount){
                return this.login({email,password})
            }
            else{
                return userAccount;
            }
            
        } 
        
        catch (error) {
            throw error;
        }
    }

// method for login

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);

        }
        catch(error){
           throw error;
        }
    }


    // method for getting current user 
    async getCurrentUser(){
        try{
            return await this.account.get();
        }
    
    catch(error){
       console.log("Appwrite service :: getCurrentUser :: error", error);
       return null;
    }
    
   }

//    method for logout
   async logout(){
    try{
        await this.account.deleteSessions();
    }
    catch(error){
        console.log("Appwrite service :: logout :: error", error);
    }
   }
}

// forming object of above class  
//  so that we can access any required method by object.method

const authService = new AuthService();

export default authService;
