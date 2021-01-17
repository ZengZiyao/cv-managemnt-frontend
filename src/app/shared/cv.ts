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
    workExperiences: WorkExperience[]
}