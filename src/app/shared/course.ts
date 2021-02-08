export class Course {
    id: string;
    courseCode: string;
    title: string;
    startYear: Date;
    endYear: Date;
    semester: number;
    courseLevel: string;
    courseType: string;
}

export enum CourseType {
    LECTURE,
    TUTORIAL,
    LAB,
    OTHERS
}