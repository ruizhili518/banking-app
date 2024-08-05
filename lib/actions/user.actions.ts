'use server'

import {createAdminClient, createSessionClient} from "@/lib/appwrite";
import {ID} from "node-appwrite";
import {cookies} from "next/headers";
import {parseStringify} from "@/lib/utils";
export const signIn = async ({ email, password} : signInProps) => {
    try{
        const { account } = await createAdminClient();
        const res = await account.createEmailPasswordSession(email,password);

        return parseStringify(res);
    } catch(e){
        console.error('Error in sign-in',e);
    }
}

export const signUp = async (userData: SignUpParams) => {
    const {email, password,firstName,lastName} = userData;
    try{
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`,
        );
        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUserAccount);
    }catch(e){
        console.error('Error in sign-up',e);
    }
}

// ... your initialization functions

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const user =  await account.get();
        return parseStringify(user);
    } catch (error) {
        return null;
    }
}

export const logoutAccount = async () => {
    try{
        const { account } = await createSessionClient();
        cookies().delete('appwrite-session');
        await account.deleteSession('current')
    }catch (e){
        return null;
    }
}
