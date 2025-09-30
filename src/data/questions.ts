import { Head, HEAD_NAMES, TOPICS } from '../types/game';

// Sample questions for each head
// used perplexity ai to generate questions without modifying schema
const sampleQuestions = {
  'Kama': [
    {
      id: 'kama-1',
      question: 'The purpose of this Process Safety Management is',
      options: ['To prevent fires, explosions, and unintended releases from process', 'To improve product quality', 'To reduce operational costs', 'To prevent unsafe behaviours'],
      correctAnswer: 0
    },
    {
      id: 'kama-2',
      question: 'Safe work practices are an integral part of this Standard.',
      options: ['True', 'False'],
      correctAnswer: 0
    },
    {
      id: 'kama-3',
      question: 'Which PHL level represents a regulated high hazard process?',
      options: ['PHL3', 'PHL2', 'PHL1B', 'PHL1A'],
      correctAnswer: 3
    },
    {
      id: 'kama-4',
      question: 'Site shall review and update operating procedures at least every Five years or more frequently',
      options: ['True', 'False'],
      correctAnswer: 1
    },
    {
      id: 'kama-5',
      question: 'Which PSM element ensures that equipment is properly maintained and safe to operate?',
      options: ['Process Hazard Analysis', 'Mechanical Integrity', 'Training', 'Incident investigation'],
      correctAnswer: 1
    }
  ],
  'Krodha': [
    {
      id: 'krodha-1',
      question: 'Which of the following hoses is NOT covered under this standard?',
      options: ['Process Hose', 'Utility Hose', 'Steam Hose', 'Fire water Hose'],
      correctAnswer: 3
    },
    {
      id: 'krodha-2',
      question: 'What does the acronym S.T.A.M.P.E.D stand for in hose specification?',
      options: ['Size, Temperature, Application, Material, Pressure, Ends, Delivery', 'Strength, Temperature, Application, Material, Pressure, Ends, Durability', 'Size, Thickness, Application, Material, Pressure, Ends, Design', 'Size, Temperature, Application, Material, Pressure, Ends, Documentation'],
      correctAnswer: 0
    },
    {
      id: 'krodha-3',
      question: 'Which of the following is NOT an acceptable hose clamp?',
      options: ['Crimped on coupling', 'High pressure clamp', 'Worm gear clamp', 'Flanged coupling'],
      correctAnswer: 2
    },
    {
      id: 'krodha-4',
      question: 'What is the definition of MAWP?',
      options: ['Minimum allowable working pressure', 'Maximum allowable working pressure', 'Maximum actual working pressure', 'Minimum actual working pressure'],
      correctAnswer: 1
    },
    {
      id: 'krodha-5',
      question: 'Hose assemblies can be lifted by the middle with ends hanging down.',
      options: ['True', 'False'],
      correctAnswer: 1
    }
  ],
  'Moha': [
    {
      id: 'moha-1',
      question: 'Control of ignition sources is acceptable as a basis of safety for powders with MIE 3 mJ.',
      options: ['True', 'False'],
      correctAnswer: 1
    },
    {
      id: 'moha-2',
      question: 'What is the particle size threshold for evaluating fire and explosion characteristics of particulate solids?',
      options: ['50 microns', '100 microns', '500 microns', '1000 microns'],
      correctAnswer: 2
    },
    {
      id: 'moha-3',
      question: 'The Dust Hazard Assessment DHA must be revalidated every 10 years.',
      options: ['True', 'False'],
      correctAnswer: 1
    },
    {
      id: 'moha-4',
      question: 'Which of the following is not a valid explosion protection method',
      options: ['Use of water mist', 'Oxidant concentration reduction', 'Deflagration suppression', 'Deflagration venting'],
      correctAnswer: 0
    },
    {
      id: 'moha-5',
      question: 'What is the minimum volume of equipment that requires explosion protection systems?',
      options: ['2m3', '1m3', '0.2m3', '0.1m3'],
      correctAnswer: 2
    }
  ],
  'Lobha': [
    {
      id: 'lobha-1',
      question: 'Which of the following is NOT part of the MOC-PC classification?',
      options: ['Minor Change', 'Moderate Change', 'Major Change', 'Critical Change'],
      correctAnswer: 3
    },
    {
      id: 'lobha-2',
      question: 'What is the maximum allowable time frame for a temporary organizational change?',
      options: ['3 months', '6 months', '9 months', '12 months'],
      correctAnswer: 1
    },
    {
      id: 'lobha-3',
      question: 'SIMS is the system used to document and manage MOC records',
      options: ['True', 'False'],
      correctAnswer: 0
    },
    {
      id: 'lobha-4',
      question: 'Which document is used to evaluate the initial impact of a process change?',
      options: ['MOC Change Log', 'MOC-PC Classification Tool', 'Initial Impact Evaluation Checklist', 'PSSR Form'],
      correctAnswer: 2
    },
    {
      id: 'lobha-5',
      question: 'Changes related to supply chain, vendors, and transportation such as Safety Data Sheets SDS, raw material specifications, and impurity formation are not applicable for this Management of Change MOC.',
      options: ['True', 'False'],
      correctAnswer: 1
    }
  ],
  'Mada': [
    {
      id: 'mada-1',
      question: 'What is the primary purpose of the PSSR procedure?',
      options: ['To ensure safe startup of the manufacturing unit', 'To train new employees', 'To reduce production costs', 'To conduct environmental audits'],
      correctAnswer: 0
    },
    {
      id: 'mada-2',
      question: 'Which of the following is excluded from the PSSR scope?',
      options: ['Emergency shutdown of a unit', 'Annual shutdown', 'Reinstalling identical equipment', 'Planned shutdown less than 2 weeks'],
      correctAnswer: 3
    },
    {
      id: 'mada-3',
      question: 'Who is responsible for leading the PSSR?',
      options: ['Factory Manager', 'Head of Maintenance', 'EHS Representative', 'MOC Initiator'],
      correctAnswer: 3
    },
    {
      id: 'mada-4',
      question: 'PSSR is not required for new projects.',
      options: ['True', 'False'],
      correctAnswer: 1
    },
    {
      id: 'mada-5',
      question: 'What is the minimum number of people required to conduct a PSSR?',
      options: ['4', '3', '2', '1'],
      correctAnswer: 2
    }
  ],
  'Ahamkara': [
    {
      id: 'ahamkara-1',
      question: 'What is the maximum duration a PSP-11 permit is valid for?',
      options: ['12 Hours', '24 Hours', '48 Hours', '72 Hours'],
      correctAnswer: 1
    },
    {
      id: 'ahamkara-2',
      question: 'Which of the following interlocks requires approval from the Site Head for bypassing?',
      options: ['BPCS Interlocks', 'Non-SIL Hardwired Interlocks', 'Machine Safety Interlocks', 'Critical Alarms'],
      correctAnswer: 2
    },
    {
      id: 'ahamkara-3',
      question: 'Operators can bypass interlocks without a permit if the equipment is not running.',
      options: ['True', 'False'],
      correctAnswer: 1
    },
    {
      id: 'ahamkara-4',
      question: 'Which type of interlock is not allowed to be bypassed during running conditions if credit is taken in PHALOPA?',
      options: ['Critical Alarm', 'Non-SIL Interlock', 'BPCS Interlock', 'SISSIL Interlock'],
      correctAnswer: 3
    },
    {
      id: 'ahamkara-5',
      question: 'What is the role of an alarm in process safety?',
      options: ['To notify operators of abnormal conditions', 'To shut down equipment', 'To control temperature', 'To log data'],
      correctAnswer: 0
    }
  ],
  'Maatsarya': [
    {
      id: 'matsarya-1',
      question: 'What is the main purpose of the PHA Process hazard analysis procedure?',
      options: ['To design new equipment', 'To conduct financial audits', 'To identify and evaluate process hazards and controls', 'All the above'],
      correctAnswer: 2
    },
    {
      id: 'matsarya-2',
      question: 'The PHA team must conduct a field walk-through before analysis.',
      options: ['True', 'False'],
      correctAnswer: 0
    },
    {
      id: 'matsarya-3',
      question: 'Which of the following is NOT a typical guide word used in HAZOP?',
      options: ['More', 'Less', 'Reverse', 'Stop'],
      correctAnswer: 3
    },
    {
      id: 'matsarya-4',
      question: 'Incomplete or missing PSI is a valid reason to stop a PHA session.',
      options: ['True', 'False'],
      correctAnswer: 0
    },
    {
      id: 'matsarya-5',
      question: 'Which of the following is not a scenario-based PHA methodology?',
      options: ['Fault Tree Analysis', 'Checklist only', 'What if?', 'HAZOP'],
      correctAnswer: 1
    }
  ],
  'Ghrina': [
    {
      id: 'ghrina-1',
      question: 'When must training be provided on the Car-sealLock procedure?',
      options: ['Every month', 'Only during audits', 'Upon new hire or job change', 'Only for contractors'],
      correctAnswer: 2
    },
    {
      id: 'ghrina-2',
      question: 'A Management of Change MOC is not required to add or remove a valve from the master register.',
      options: ['True', 'False'],
      correctAnswer: 1
    },
    {
      id: 'ghrina-3',
      question: 'Car Seal is considered as Safeguard.',
      options: ['Administrative', 'Reactive', 'Engineering', 'Eliminative'],
      correctAnswer: 0
    },
    {
      id: 'ghrina-4',
      question: 'The SOP allows verbal approval for valve position changes during normal operations.',
      options: ['True', 'False'],
      correctAnswer: 1
    },
    {
      id: 'ghrina-5',
      question: 'What does the acronym CSC represent in the context of PID nomenclature?',
      options: ['Carseal Open', 'Lock Closed', 'Lock Open', 'Carseal Closed'],
      correctAnswer: 3
    }
  ],
  'Bhaya': [
    {
      id: 'bhaya-1',
      question: 'What does Process Safety Information PSI primarily include?',
      options: ['Employee participation', 'Environmental monitoring data', 'Information on process materials, technology, and equipment', 'None of the above'],
      correctAnswer: 2
    },
    {
      id: 'bhaya-2',
      question: 'Before conducting a PHA, PSI must be',
      options: ['Reviewed by external auditors', 'Approved by the Factory Manager', 'Approved by the Site head', 'Verified as accurate and complete'],
      correctAnswer: 3
    },
    {
      id: 'bhaya-3',
      question: 'A facility handles powdered chemicals. The PSI lacks data on Kst and MIE. What is the risk?',
      options: ['No risk if dust is collected', 'Potential for explosion due to lack of hazard characterization', 'Risk only during packaging', 'Risk only if dust is visible'],
      correctAnswer: 1
    },
    {
      id: 'bhaya-4',
      question: 'A new batch process involves a reactive intermediate. During the PHA, the team realizes thermal stability data is missing. What is the correct course of action?',
      options: ['Proceed with assumptions based on similar chemicals', 'Continue the PHA and collect data later', 'Place the PHA on hold until thermal stability data is available', 'Ask the vendor for verbal confirmation'],
      correctAnswer: 2
    },
    {
      id: 'bhaya-5',
      question: 'Which of the following is not typically part of Process safety information PSI documentation?',
      options: ['Marketing strategy documents', 'Piping and Instrumentation Diagrams PIDs', 'Process Flow Diagrams PFDs', 'Safety Data Sheets SDS'],
      correctAnswer: 0
    }
  ],
  'Buddhi': [
    {
      id: 'buddhi-1',
      question: 'Which of the following best describes the role of employee participation in a Process Safety Management PSM audit?',
      options: ['Employees are only responsible for reporting safety incidents after the audit is completed.', 'Employees actively contribute by sharing operational insights and identifying hazards during the audit process.', 'Employees are not involved in audits as it is solely a management responsibility.', 'Employees participate only in training sessions, not in audits.'],
      correctAnswer: 1
    },
    {
      id: 'buddhi-2',
      question: 'What is the primary objective of conducting a PSM audit?',
      options: ['To punish employees for non-compliance', 'To train new employees', 'To reduce production costs', 'To evaluate the effectiveness of safety systems and ensure regulatory compliance'],
      correctAnswer: 3
    },
    {
      id: 'buddhi-3',
      question: 'Which of the following is a benefit of employee participation during safety audits?',
      options: ['It reduces the need for documentation', 'It ensures that only management views are considered', 'It helps identify practical issues and improves safety culture', 'It delays the audit process'],
      correctAnswer: 2
    },
    {
      id: 'buddhi-4',
      question: 'Which of the following actions best demonstrates meaningful employee participation in a PSM audit?',
      options: ['Providing feedback on safety procedures and suggesting improvements', 'Ignoring audit findings', 'Avoiding discussions with auditors', 'Delegating all responsibilities to supervisors'],
      correctAnswer: 0
    },
    {
      id: 'buddhi-5',
      question: 'Employees are only allowed to participate in audits if they are part of the safety committee.',
      options: ['True', 'False'],
      correctAnswer: 1
    }
  ]
};
;

export function createInitialHeads(): Head[] {
  return HEAD_NAMES.map((name, index) => ({
    id: name.toLowerCase(),
    name,
    topic: TOPICS[index],
    questions: sampleQuestions[name as keyof typeof sampleQuestions] || [],
    answeredCount: 0,
    correctAnswers: 0,
    totalTime: 0,
    status: 'active',
    questionStatus: ['default', 'default', 'default', 'default', 'default']
  }));
}