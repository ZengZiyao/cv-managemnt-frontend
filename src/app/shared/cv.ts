import { Citation } from './citation';
import { Student } from './student';
import { Course } from './course';
import { AcademicQualification } from './academic-qualification';
import { Membership } from './membership';
import { Project } from './project';
import { WorkExperience } from './work-experience';
import { Publication } from './publication';
import { Award } from './award';
import { Biography } from './biography';
import { Profile } from './profile';

export class Cv {
  profile: Profile;
  biography: Biography;
  awards: Award[];
  projects: Project[];
  publications: Publication[];
  workExperiences: WorkExperience[];
  memberships: Membership[];
  academicQualifications: AcademicQualification[];
  courses: Course[];
  masterStudents: Student[];
  phdStudents: Student[];
  citations: Citation[];
}
