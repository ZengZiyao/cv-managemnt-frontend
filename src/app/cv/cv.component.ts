import { Citation } from './../shared/citation';
import { Status } from './../shared/status';
import { StatusService } from './../services/status.service';
import { Student } from './../shared/student';
import { Course } from './../shared/course';
import { Publication } from './../shared/publication';
import { Project } from './../shared/project';
import { Award } from './../shared/award';
import { WorkExperience } from './../shared/work-experience';
import { Membership } from './../shared/membership';
import { AcademicQualification } from './../shared/academic-qualification';
import { Profile } from './../shared/profile';
import { Cv } from './../shared/cv';
import { Component, OnInit } from '@angular/core';
import {
  AlignmentType,
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableCell,
  TableRow,
  UnderlineType,
  WidthType,
  LevelFormat,
} from 'docx';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { PubType } from '../shared/pubType';

const cvId = '5f54c35ec4ddda34dc40b4ed';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
})
export class CvComponent implements OnInit {
  select: boolean;
  exportable: boolean;
  cv: Cv;
  status: Status = new Status();
  empty: boolean;
  profileReady: boolean;
  awardReady: boolean;
  projectReady: boolean;
  publicationReady: boolean;
  workExperienceReady: boolean;
  membershipReady: boolean;
  academicQualificationReady: boolean;
  courseReady: boolean;
  studentReady: boolean;
  citationReady: boolean;

  constructor(private statusService: StatusService) {}

  ngOnInit(): void {
    this.select = false;
    this.exportable = false;
    this.cv = new Cv();
    this.statusService.getStatus().subscribe((data) => {
      this.status = data;
      this.empty = !(
        this.status.academicQualification ||
        this.status.award ||
        this.status.course ||
        this.status.membership ||
        this.status.profile ||
        this.status.project ||
        this.status.publication ||
        this.status.student ||
        this.status.workExperience
        || this.status.citation
      );
    });
  }

  receiveMessage($event) {
    this.select = $event;
  }

  cancel() {
    this.ngOnInit();
    this.reset();
  }

  exportCV() {
    this.exportable = true;
  }

  createDoc(cv: Cv) {
    const doc = new Document({
      numbering: {
        config: [
          {
            reference: 'numbering',
            levels: [
              {
                level: 0,
                format: LevelFormat.DECIMAL,
                text: '%1.',
                alignment: AlignmentType.START,
                style: {
                  paragraph: {
                    indent: { left: 300, hanging: 260 },
                  },
                },
              },
            ],
          },
        ],
      },
    });

    doc.addSection({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: 'CURRICULUM VITAE',
              font: 'Arial',
              size: 24,
              bold: true,
            }),
            new TextRun({}),
          ],
          alignment: AlignmentType.CENTER,
        }),
        this.createProfile(cv.profile),
        ...this.createAcademicQualiifcation(cv.academicQualifications),
        ...this.createMemberships(cv.memberships),
        ...this.createWorkExperiences(cv.workExperiences),
        ...this.createAwards(cv.awards),
        ...this.createFunding(cv.projects),
        ...this.createCitations(cv.citations),
        ...this.createPublications(cv.publications),
        ...this.creatCourses(cv.courses),
        ...this.createStudents(cv.phdStudents, cv.masterStudents),
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'example.docx');
    });
  }

  createProfile(profile: Profile) {
    if (profile != undefined) {
      return new Paragraph({
        children: [
          new TextRun({
            text: `${profile.name}`,
            font: 'Arial',
            size: 22,
            break: 1,
          }),
          new TextRun({
            text: `${profile.designation}`,
            font: 'Arial',
            size: 22,
            break: 1,
          }),
          new TextRun({
            text: `School of ${profile.school}`,
            font: 'Arial',
            size: 22,
            break: 1,
          }),
        ],
        alignment: AlignmentType.CENTER,
      });
    }
  }

  createAcademicQualiifcation(aqs: AcademicQualification[]) {
    if (aqs != undefined && aqs.length > 0) {
      return [
        this.createHeading('Academic Qualifications'),
        new Paragraph({
          spacing: {
            line: 350,
          },
          children: aqs
            .sort((a, b) => b.year.getFullYear() - a.year.getFullYear())
            .map((aq) => {
              let year = new Date(aq.year).getFullYear();
              return new TextRun({
                text: `${year}\t${aq.degree}(${aq.major}), ${aq.university}`,
                font: 'Arial',
                size: 22,
                break: 1,
              });
            }),
        }),
      ];
    }
    return [];
  }

  createMemberships(memberships: Membership[]) {
    if (memberships != undefined && memberships.length > 0) {
      return [
        this.createHeading('Professional Qualifications / Memberships'),
        new Paragraph({
          spacing: {
            line: 350,
          },
          children: memberships
            .sort(
              (a, b) => b.startTime.getFullYear() - a.startTime.getFullYear()
            )
            .map((m) => {
              let endTime =
                m.endTime == undefined
                  ? 'Present'
                  : new Date(m.endTime).getFullYear();
              return new TextRun({
                text: `${new Date(m.startTime).getFullYear()} - ${endTime}\t${
                  m.designation
                }, ${m.institution}\t${m.state}, ${m.country.name}`,
                font: 'Arial',
                size: 22,
                break: 1,
              });
            }),
        }),
      ];
    }

    return [];
  }

  createWorkExperiences(wes: WorkExperience[]) {
    if (wes != undefined && wes.length > 0) {
      return [
        this.createHeading('Summary of Working Experience'),
        new Paragraph({
          children: wes
            .sort(
              (a, b) =>
                new Date(b.startTime).getTime() -
                new Date(a.startTime).getTime()
            )
            .map((we) => {
              let startTime = moment(new Date(we.startTime)).format('MMM yyyy');
              let endTime =
                we.endTime == undefined
                  ? 'Present'
                  : moment(new Date(we.endTime)).format('MMM yyyy');
              return new TextRun({
                text: `${startTime} - ${endTime}\t${we.title}, ${we.company}`,
                font: 'Arial',
                size: 22,
                break: 1,
              });
            }),
          spacing: {
            line: 350,
          },
        }),
      ];
    }

    return [];
  }

  createAwards(awards: Award[]) {
    if (awards != undefined && awards.length > 0) {
      return [
        this.createHeading('Academic Honours and Awards'),
        new Paragraph({
          children: [
            new TextRun({
              break: 0,
            }),
          ],
        }),
        new Table({
          width: {
            size: 100,
            type: WidthType.PERCENTAGE,
          },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({
                  width: {
                    size: 20,
                    type: WidthType.PERCENTAGE,
                  },
                  margins: {
                    left: 50,
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: 'Year',
                          bold: true,
                          font: 'Arial',
                          size: 22,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  margins: {
                    left: 50,
                  },
                  width: {
                    size: 80,
                    type: WidthType.PERCENTAGE,
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: 'Academic Honour / Award',
                          bold: true,
                          font: 'Arial',
                          size: 22,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            ...awards
              .sort((a, b) => b.date.getFullYear() - a.date.getFullYear())
              .map((a) => {
                return new TableRow({
                  children: [
                    new TableCell({
                      margins: {
                        left: 50,
                      },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `${new Date(a.date).getFullYear()}`,
                              font: 'Arial',
                              size: 22,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      margins: {
                        left: 50,
                      },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `${a.content}`,
                              font: 'Arial',
                              size: 22,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                });
              }),
          ],
        }),
      ];
    }

    return [];
  }

  createFunding(projects: Project[]) {
    let arr = [];
    if (projects != undefined && projects.length > 0) {
      arr.push(this.createHeading('Research Funding'));
      let internal = [];
      let external = [];
      projects.forEach((p) => {
        if (p.external) {
          external.push(p);
        } else {
          internal.push(p);
        }
      });
      if (external.length > 0) {
        arr.push(this.createSubheading('External Grants'));
        arr.push(this.createGrants(external));
      }
      if (internal.length > 0) {
        arr.push(this.createSubheading('Internal Grants'));
        arr.push(this.createGrants(internal));
      }
    }
    return arr;
  }

  createGrants(projects: Project[]) {
    return new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      rows: [
        new TableRow({
          tableHeader: true,
          children: [
            new TableCell({
              margins: {
                left: 50,
              },
              width: {
                size: 10,
                type: WidthType.PERCENTAGE,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Role',
                      bold: true,
                      font: 'Arial',
                      size: 22,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              margins: {
                left: 50,
              },
              width: {
                size: 20,
                type: WidthType.PERCENTAGE,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Year',
                      bold: true,
                      font: 'Arial',
                      size: 22,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              margins: {
                left: 50,
              },
              width: {
                size: 30,
                type: WidthType.PERCENTAGE,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Project Title',
                      bold: true,
                      font: 'Arial',
                      size: 22,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              margins: {
                left: 50,
              },
              width: {
                size: 20,
                type: WidthType.PERCENTAGE,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Amount(S$)',
                      bold: true,
                      font: 'Arial',
                      size: 22,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              margins: {
                left: 50,
              },
              width: {
                size: 20,
                type: WidthType.PERCENTAGE,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Source of Grant',
                      bold: true,
                      font: 'Arial',
                      size: 22,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        ...projects
          .sort((a, b) => b.startYear - a.startYear)
          .map((p) => {
            return new TableRow({
              children: [
                new TableCell({
                  margins: {
                    left: 50,
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: `${p.role}`,
                          font: 'Arial',
                          size: 22,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  margins: {
                    left: 50,
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: `${p.startYear} - ${p.endYear}`,
                          font: 'Arial',
                          size: 22,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  margins: {
                    left: 50,
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: `${p.title}`,
                          font: 'Arial',
                          size: 22,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  margins: {
                    left: 50,
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: `${p.fundingAmount}`,
                          font: 'Arial',
                          size: 22,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  margins: {
                    left: 50,
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: `${p.funder}`,
                          font: 'Arial',
                          size: 22,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            });
          }),
      ],
    });
  }

  createPublications(publications: Publication[]) {
    let arr = [];
    if (publications != undefined && publications.length > 0) {
      arr.push(this.createHeading('Publications'));
      let journals = [];
      let conferences = [];
      publications.forEach((p) => {
        if (p.type === PubType.JOURNAL) {
          journals.push(p);
        } else if (p.type === PubType.CONFERENCE) {
          conferences.push(p);
        }
      });

      if (journals.length > 0) {
        arr.push(this.createSubheading('Journal Papers'));
        arr = arr.concat(this.createJournals(journals));
      }
      if (conferences.length > 0) {
        arr.push(this.createSubheading('Conference Papers'));
        arr = arr.concat(this.createConferences(conferences));
      }
    }

    return arr;
  }

  createJournals(publications: Publication[]) {
    let arr = [];
    arr.push(new Paragraph({}));
    publications.forEach((p) => {
      arr.push(
        new Paragraph({
          numbering: {
            reference: 'numbering',
            level: 0,
          },
          children: [
            ...p.authors.map((a) => {
              return new TextRun({
                text: `${a.name}${a.student ? '*' : a.fellow ? '**' : ''}, `,
                bold: a.main,
                font: 'Arial',
                size: 22,
              });
            }),
            new TextRun({
              text: `"${p.title}". ${p.pubSource.name}, ${p.page}, ${moment(
                new Date(p.date)
              ).format('MMM yyyy')}.`,
              font: 'Arial',
              size: 22,
            }),
            new TextRun({
              text: p.tier === '1A' ? '##' : '#',
              font: 'Arial',
              size: 22,
            }),
            new TextRun({
              break: 1,
            }),
          ],
        })
      );
    });
    return arr;
  }

  createConferences(publications: Publication[]) {
    let arr = [];
    publications.forEach((p) => {
      arr.push(
        new Paragraph({
          numbering: {
            reference: 'numbering',
            level: 0,
          },
          children: [
            ...p.authors.map((a) => {
              return new TextRun({
                text: `${a.name}${a.student ? '*' : a.fellow ? '**' : ''}, `,
                bold: a.main,
                font: 'Arial',
                size: 22,
              });
            }),
            new TextRun({
              text: `"${p.title}". ${p.pubSource.name}, ${p.country}, ${
                p.page
              }, ${moment(new Date(p.date)).format('MMM yyyy')}.`,
              font: 'Arial',
              size: 22,
            }),
            new TextRun({
              break: 1,
            }),
          ],
        })
      );
    });
    return arr;
  }

  creatCourses(courses: Course[]) {
    let arr = [];
    if (courses != undefined && courses.length > 0) {
      arr.push(
        this.createHeading('Key Courses Taught (Current Year and Last 2 years)')
      );
      arr.push(new Paragraph({}));
      arr.push(
        new Table({
          width: {
            size: 100,
            type: WidthType.PERCENTAGE,
          },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({
                  margins: {
                    left: 50,
                  },
                  width: {
                    size: 10,
                    type: WidthType.PERCENTAGE,
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: 'Course Code',
                          bold: true,
                          font: 'Arial',
                          size: 22,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  margins: {
                    left: 50,
                  },
                  width: {
                    size: 25,
                    type: WidthType.PERCENTAGE,
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: 'Course Title',
                          bold: true,
                          font: 'Arial',
                          size: 22,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  margins: {
                    left: 50,
                  },
                  width: {
                    size: 20,
                    type: WidthType.PERCENTAGE,
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: 'Academic Year',
                          bold: true,
                          font: 'Arial',
                          size: 22,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  margins: {
                    left: 50,
                  },
                  width: {
                    size: 10,
                    type: WidthType.PERCENTAGE,
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: 'Course Level',
                          bold: true,
                          font: 'Arial',
                          size: 22,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  margins: {
                    left: 50,
                  },
                  width: {
                    size: 25,
                    type: WidthType.PERCENTAGE,
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: 'Type\n(Lecture, Tutorial, etc.)',
                          bold: true,
                          font: 'Arial',
                          size: 22,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  margins: {
                    left: 50,
                  },
                  width: {
                    size: 10,
                    type: WidthType.PERCENTAGE,
                  },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: 'Semester',
                          bold: true,
                          font: 'Arial',
                          size: 22,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            ...courses
              .sort(
                (a, b) =>
                  new Date(b.startYear).getFullYear() -
                  new Date(a.startYear).getFullYear()
              )
              .map((c) => {
                return new TableRow({
                  children: [
                    new TableCell({
                      margins: {
                        left: 50,
                      },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: c.courseCode,
                              font: 'Arial',
                              size: 22,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      margins: {
                        left: 50,
                      },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: c.title,
                              font: 'Arial',
                              size: 22,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      margins: {
                        left: 50,
                      },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `AY${moment(new Date(c.startYear)).format(
                                'yy'
                              )} - ${
                                c.endYear == undefined
                                  ? 'Current'
                                  : 'AY' +
                                    moment(new Date(c.endYear)).format('yy')
                              }`,
                              font: 'Arial',
                              size: 22,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      margins: {
                        left: 50,
                      },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: c.courseLevel,
                              font: 'Arial',
                              size: 22,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      margins: {
                        left: 50,
                      },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: c.courseType,
                              font: 'Arial',
                              size: 22,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      margins: {
                        left: 50,
                      },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `${c.semester}`,
                              font: 'Arial',
                              size: 22,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                });
              }),
          ],
        })
      );
    }
    return arr;
  }

  createStudents(phds: Student[], masters: Student[]) {
    let arr = [];
    if (
      (phds != undefined && phds.length > 0) ||
      (masters != undefined && masters.length > 0)
    ) {
      arr.push(this.createHeading('Academic Supervision and Mentoring'));

      if (phds != undefined && phds.length > 0) {
        arr.push(this.createSubheading('PhD students'));
        arr.push(new Paragraph({}));
        arr.push(this.createStudentsTable(phds, 'PhD'));
      }
      if (masters != undefined && masters.length > 0) {
        arr.push(this.createSubheading('Masters students (By Research Only)'));
        arr.push(new Paragraph({}));
        arr.push(this.createStudentsTable(masters, 'Master'));
      }
    }
    return arr;
  }

  createStudentsTable(students: Student[], type: string) {
    let currents: Student[] = [];
    let graduates: Student[] = [];
    students.forEach((s) => {
      if (s.endYear == undefined) {
        currents.push(s);
      } else {
        graduates.push(s);
      }
    });

    let rows: TableRow[] = [];
    rows.push(
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({
            margins: {
              left: 50,
            },
            width: {
              size: 5,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'No.',
                    bold: true,
                    font: 'Arial',
                    size: 22,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            margins: {
              left: 50,
            },
            width: {
              size: 20,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${type === 'PhD' ? 'PhD' : 'Masters'} Student`,
                    bold: true,
                    font: 'Arial',
                    size: 22,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            margins: {
              left: 50,
            },
            width: {
              size: 20,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Period',
                    bold: true,
                    font: 'Arial',
                    size: 22,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            margins: {
              left: 50,
            },
            width: {
              size: 20,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Role',
                    bold: true,
                    font: 'Arial',
                    size: 22,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            margins: {
              left: 50,
            },
            width: {
              size: 20,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Thesis/ Project Title',
                    bold: true,
                    font: 'Arial',
                    size: 22,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            margins: {
              left: 50,
            },
            width: {
              size: 15,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Current Status',
                    bold: true,
                    font: 'Arial',
                    size: 22,
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );
    if (currents.length > 0) {
      rows.push(
        new TableRow({
          children: [
            new TableCell({
              columnSpan: 6,
              margins: {
                left: 50,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Currently Supervising',
                      bold: true,
                      font: 'Arial',
                      size: 22,
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
      );
      rows = rows.concat(this.createStudentRows(currents));
    }

    if (graduates.length > 0) {
      rows.push(
        new TableRow({
          children: [
            new TableCell({
              columnSpan: 6,
              margins: {
                left: 50,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Graduated (Current Year and Last 2 years)',
                      bold: true,
                      font: 'Arial',
                      size: 22,
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
      );
      rows = rows.concat(this.createStudentRows(graduates));
    }
    return new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      rows: rows,
    });
  }

  createStudentRows(students: Student[]) {
    return students
      .sort(
        (a, b) =>
          new Date(b.startYear).getFullYear() -
          new Date(a.startYear).getFullYear()
      )
      .map(
        (s, index) =>
          new TableRow({
            children: [
              new TableCell({
                margins: {
                  left: 50,
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `${index + 1}`,
                        font: 'Arial',
                        size: 22,
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                margins: {
                  left: 50,
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: s.name,
                        font: 'Arial',
                        size: 22,
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                margins: {
                  left: 50,
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `${new Date(s.startYear).getFullYear()} - ${
                          s.endYear == undefined
                            ? 'present'
                            : new Date(s.endYear).getFullYear()
                        }`,
                        font: 'Arial',
                        size: 22,
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                margins: {
                  left: 50,
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: s.role,
                        font: 'Arial',
                        size: 22,
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                margins: {
                  left: 50,
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: s.title,
                        font: 'Arial',
                        size: 22,
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                margins: {
                  left: 50,
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: s.status,
                        font: 'Arial',
                        size: 22,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          })
      );
  }

  createHeading(content: string) {
    return new Paragraph({
      children: [
        new TextRun({
          text: content,
          bold: true,
          font: 'Arial',
          size: 22,
          break: 2,
          underline: {
            type: UnderlineType.SINGLE,
          },
        }),
      ],
    });
  }

  createCitations(citations: Citation[]) {
    let arr = [];
    if (
      citations != undefined && citations.length > 0
    ) {
      arr.push(this.createHeading('Citation Summary'));
      arr.push(new Paragraph({}));
        arr.push(this.createCitationsTable(citations));
    }
    return arr;
  }

  createCitationsTable(citations: Citation[]) {
    let rows: TableRow[] = [];
    rows.push(
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({
            margins: {
              left: 50,
            },
            width: {
              size: 25,
              type: WidthType.PERCENTAGE,
            },
            rowSpan: 2,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Datebase',
                    bold: true,
                    font: 'Arial',
                    size: 22,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            margins: {
              left: 50,
            },
            width: {
              size: 50,
              type: WidthType.PERCENTAGE,
            },
            columnSpan: 2,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,

                children: [
                  new TextRun({
                    text: 'Citation Count',
                    bold: true,
                    font: 'Arial',
                    size: 22,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            margins: {
              left: 50,
            },
            width: {
              size: 25,
              type: WidthType.PERCENTAGE,
            },
            rowSpan: 2,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,

                children: [
                  new TextRun({
                    text: 'H-index',
                    bold: true,
                    font: 'Arial',
                    size: 22,
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );
    rows.push(
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({
            margins: {
              left: 50,
            },
            width: {
              size: 25,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,

                children: [
                  new TextRun({
                    text: 'without self-citations',
                    bold: true,
                    font: 'Arial',
                    size: 22,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            margins: {
              left: 50,
            },
            width: {
              size: 25,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,

                children: [
                  new TextRun({
                    text: 'with self-citations',
                    bold: true,
                    font: 'Arial',
                    size: 22,
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );

      rows = rows.concat(this.createCitationRows(citations));

    return new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      rows: rows,
    });
  }

  createCitationRows(citations: Citation[]) {
    return citations
      .sort(
        (a, b) =>
          a.database -
          b.database
      )
      .map(
        (c) =>
          new TableRow({
            children: [
              new TableCell({
                margins: {
                  left: 50,
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: c.database == 0 ? 'Scopus' : c.database == 1 ? 'Web of Science (SCI)' : 'Google Scholar',
                        font: 'Arial',
                        size: 22,
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                margins: {
                  left: 50,
                },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,

                    children: [
                      new TextRun({
                        text: c.database == 2 ? '' : `${c.countWithoutSelf}`,
                        font: 'Arial',
                        size: 22,
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                margins: {
                  left: 50,
                },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: `${c.countWithSelf}`,
                        font: 'Arial',
                        size: 22,
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                margins: {
                  left: 50,
                },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,

                    children: [
                      new TextRun({
                        text: `${c['hindex']}`,
                        font: 'Arial',
                        size: 22,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          })
      );
  }

  createSubheading(content: string) {
    return new Paragraph({
      children: [
        new TextRun({
          text: content,
          bold: true,
          font: 'Arial',
          size: 22,
          break: 1,
        }),
      ],
    });
  }

  receiveReadyMessage($event, name: string) {
    switch (name) {
      case 'profile':
        this.profileReady = $event;
        break;
      case 'award':
        this.awardReady = $event;
        break;
      case 'project':
        this.projectReady = $event;
        break;
      case 'publication':
        this.publicationReady = $event;
        break;
      case 'work experience':
        this.workExperienceReady = $event;
        break;
      case 'membership':
        this.membershipReady = $event;
        break;
      case 'academic qualification':
        this.academicQualificationReady = $event;
        break;
      case 'course':
        this.courseReady = $event;
        break;
      case 'student':
        this.studentReady = $event;
        break;
      case 'citation':
        this.citationReady = $event;
        break;
    }

    if (
      this.profileReady &&
      this.awardReady &&
      this.projectReady &&
      this.publicationReady &&
      this.workExperienceReady &&
      this.membershipReady &&
      this.academicQualificationReady &&
      this.courseReady &&
      this.studentReady &&
      this.citationReady
    ) {
      this.createDoc(this.cv);
      this.reset();
    }
  }

  reset() {
    this.profileReady = false;
    this.awardReady = false;
    this.profileReady = false;
    this.publicationReady = false;
    this.workExperienceReady = false;
    this.membershipReady = false;
    this.academicQualificationReady = false;
    this.courseReady = false;
    this.studentReady = false;
    this.citationReady = false;
    this.cv = new Cv();
    setTimeout(() => {
      this.select = false;
      this.exportable = false;
    });
  }
}
