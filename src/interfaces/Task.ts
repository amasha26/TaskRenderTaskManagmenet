export interface Task {
    id: Number | null;
    uid: String;
    title: String;
    description: String;
    isCompleted:Boolean;
    createdAt: String;
    updatedAt: String | null;
}
