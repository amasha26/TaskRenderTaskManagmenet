import { User } from "../interfaces/User";
import users from "../Schemas/user.schema";

export const createUser=async (request:User) => { 
    let user = new users(request);
    return user.save();
}

export const findAllUsers = async () => {
    const usersList: User[] = await users.find();
    return usersList;
}

export const findUserById = async (id: String) => {
  return await users.findOne({ _id: id });
};

export const findUserByEmail = async (email:String) => {
    return await users.findOne({ email: email });
};
