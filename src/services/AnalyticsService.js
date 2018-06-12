export default ['$state', '$rootScope',function($state, $rootScope){
  var that= {

            };

  return that;

}];


// // import inject from '../helpers/inject';
// // import PUBLISHERS from '../constants/publishers';
// // import * as RUNTIME_CONFIG from '../runtime/config.json';

// // export const MONTHLY_REPORTS_ENDPOINT = 'analytics/reports';

// export default class AnalyticsService {
//   static $inject = [
//     // 'HttpService',
//     // '$http',
//     // '$rootScope',
//     // 'baseUrl',
//     // 'HelperFunctions',
//     'ChartsService'
//   ];

//   constructor() {
//     inject(this, AnalyticsService.$inject, arguments);
//     this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
//     this.color1 = '#35A6DE';//blue
//     this.color2 = '#a884ba';//purple
//     this.color3 = '#FBC830';//yellow
//     this.color4 = '#99D240';//green
//     this.color5 = '#eb5a4b';//red
//     this.color6 = '#ff6531';//orange
//   }

//   getMonthNameFromDateString(str) {
//     var split = str.split('-');
//     return this.months[split[1] - 1] + ' ' + split[0];
//   }

//   getMonthlyReportsData() {
//     return this.$http({
//       method:'POST',
//       url: this.baseUrl + MONTHLY_REPORTS_ENDPOINT,
//       headers:{
//         Authorization: this.$rootScope.authorization
//       }
//     });
//     //return this.HttpService.post(MONTHLY_REPORTS_ENDPOINT);
//   }

//   getActiveStudentsByMonth(monthlyData) {
//     var self = this;
//     return monthlyData.map(function(month) {
//       return { 
//         'month' : self.getMonthNameFromDateString(month.from_date),
//         'active_students': month.activity_sumary_data.number_active_students
//       };
//     });
//   }

//   getFullLicencesActivatedByMonth(monthlyData) {
//     var self = this;
//     return monthlyData.map(function(month) {
//       return { 
//         'month' : self.getMonthNameFromDateString(month.from_date),
//         'full_licences_activated': month.activity_sumary_data.number_paying_students
//       };
//     });
//   }

//   getAllLicencesActivatedByMonth(monthlyData) {
//     var self = this;
//     return monthlyData.map(function(month) {
//       return { 
//         'month' : self.getMonthNameFromDateString(month.from_date),
//         'all_licences_activated': month.activity_sumary_data.number_all_students
//       };
//     });
//   }

//   getLicencesSoldByMonth(monthlyData) {
//     var self = this;
//     return monthlyData.map(function(month) {
//       return { 
//         'month' : self.getMonthNameFromDateString(month.from_date),
//         'licences_sold': month.activity_sumary_data.number_sold_licences
//       };
//     });
//   }

//   getActiveStudentsAndLicences(monthlyData) {
//     var self = this;
//     return monthlyData.map(function(month) {
//       // ONLY BU AND ADAPTEMY HAVE LICENCES SOLD
//       if (RUNTIME_CONFIG.publisher !== PUBLISHERS.BUILDUP && RUNTIME_CONFIG.publisher !== PUBLISHERS.ADAPTEMY) {
//         return { 
//           'month' : self.getMonthNameFromDateString(month.from_date),
//           'active_students': month.activity_sumary_data.number_active_students,
//           'full_licences_activated': month.activity_sumary_data.number_paying_students,
//           'all_licences_activated': month.activity_sumary_data.number_all_students
//         };
//       }

//       return { 
//         'month' : self.getMonthNameFromDateString(month.from_date),
//         'active_students': month.activity_sumary_data.number_active_students,
//         'full_licences_activated': month.activity_sumary_data.number_paying_students,
//         'all_licences_activated': month.activity_sumary_data.number_all_students,
//         'licences_sold': month.activity_sumary_data.number_sold_licences
//       };
      
//     });
//   }

//   getActiveClassroomsAndSessions(monthlyData) {
//     var self = this;
//     return monthlyData.map(function(month) {
//       return { 
//         'month' : self.getMonthNameFromDateString(month.from_date),
//         'active_groups': month.active_groups_sessions_summary_data.number_active_groups,
//         'classroom_sessions': month.active_groups_sessions_summary_data.number_classroom_sessions
//       };
//     });
//   }

//   getActiveSchoolsAndTeachers(monthlyData) {
//     var self = this;
//     return monthlyData.map(function(month) {
//       return { 
//         'month' : self.getMonthNameFromDateString(month.from_date),
//         'active_schools': month.active_schools_teachers_summary_data.number_active_schools,
//         'active_teachers': month.active_schools_teachers_summary_data.number_active_teachers
//       };
//     });
//   }

//   getCreatedAssignments(monthlyData) {
//     var self = this;
//     return monthlyData.map(function(month) {
//       // ONLY BU AND ADAPTEMY HAVE TY
//       if (RUNTIME_CONFIG.publisher === PUBLISHERS.AULA) {
//         return { 
//           'month' : self.getMonthNameFromDateString(month.from_date),
//           'year_1': month.assignments_by_year_summary_data.assignments_started_year_1,
//           'year_2': month.assignments_by_year_summary_data.assignments_started_year_2,
//           'year_3_Aplic': month.assignments_by_year_summary_data.assignments_started_year_31,
//           'year_3_Acad': month.assignments_by_year_summary_data.assignments_started_year_32,
//           'year_4_Aplic': month.assignments_by_year_summary_data.assignments_started_year_41,
//           'year_4_Acad': month.assignments_by_year_summary_data.assignments_started_year_42
//         };
//       }
//       else if (RUNTIME_CONFIG.publisher === PUBLISHERS.BUILDUP || RUNTIME_CONFIG.publisher === PUBLISHERS.ADAPTEMY) {
//         return { 
//           'month' : self.getMonthNameFromDateString(month.from_date),
//           'year_1': month.assignments_by_year_summary_data.assignments_started_year_1,
//           'year_2': month.assignments_by_year_summary_data.assignments_started_year_2,
//           'year_3': month.assignments_by_year_summary_data.assignments_started_year_3,
//           'TY': month.assignments_by_year_summary_data.assignments_started_year_TY
//         };
//       }
//       else {
//         return { 
//           'month' : self.getMonthNameFromDateString(month.from_date),
//           'year_1': month.assignments_by_year_summary_data.assignments_started_year_1
//         };
//       }

//     });
//   }

//   getFeaturesUsed(monthlyData) {
//     var self = this;
//     return monthlyData.map(function(month) {
//       return { 
//         'month' : self.getMonthNameFromDateString(month.from_date),
//         'course_progress_page': month.teacher_feature_usage_summary_data.number_visits_course_progress,
//         'live_class_page': month.teacher_feature_usage_summary_data.number_visits_live_class,
//         'student_activity_page': month.teacher_feature_usage_summary_data.number_visits_student_activity,
//         'view_reports_page': month.teacher_feature_usage_summary_data.number_visits_report_dashboard,
//         'view_assignments_page': month.teacher_feature_usage_summary_data.number_visits_assignments,
//         'preview_student_content': month.teacher_feature_usage_summary_data.number_preview_concepts,
//       };
//     });
//   }

//   getConceptsCompletedInClassAndAtHome(monthlyData) {
//     var self = this;
//     return monthlyData.map(function(month) {
//       return { 
//         'month' : self.getMonthNameFromDateString(month.from_date),
//         'concepts_at_home': month.work_done_summary_data.number_concepts_at_home,
//         'concepts_in_class': month.work_done_summary_data.number_concepts_in_class
//       };
//     });
//   }

//   getLearningHoursInClassVsAtHome(monthlyData) {
//     var self = this;
//     return monthlyData.map(function(month) {
//       return { 
//         'month' : self.getMonthNameFromDateString(month.from_date),
//         'learning_hours_at_home': month.work_done_summary_data.number_learning_hours_at_home,
//         'learning_hours_in_class': month.work_done_summary_data.number_learning_hours_in_class
//       };
//     });
//   }

//   getAvgRateOfAssignmentCompletion(monthlyData) {
//     var self = this;
//     return monthlyData.map(function(month) {
//       return { 
//         'month' : self.getMonthNameFromDateString(month.from_date),
//         'assignments_incompletion_rate_mean': month.assignments_completion_summary_data.assignments_incompletion_rate_mean,
//         'assignments_completion_rate_mean': month.assignments_completion_summary_data.assignments_completion_rate_mean
//       };
//     });
//   }

//   getSummaryOfTeachersMakingAssignments(monthlyData) {
//     var self = this;
//     return monthlyData.map(function(month) {
//       return { 
//         'month' : self.getMonthNameFromDateString(month.from_date),
//         'teachers_without_assignments': month.assignments_teachers_summary_data.number_teachers_without_assignments,
//         'teachers_with_assignments': month.assignments_teachers_summary_data.number_teachers_with_assignments
//       };
//     });
//   }

//   orderByYear(a,b){
//     a = new Date(a.month);
//     b = new Date(b.month);

//     if (a && !b){
//       return 1;
//     }
//     if (b && !a){
//       return -1;
//     }
//     if (a > b){
//       return 1;
//     }
//     return -1;
//   }

//   /* ACTIVE STUDENTS AND LICENCES */
//   buildActiveStudentsAndLicencesChart(monthlyData) {
//     var monthlyDataArray = this.HelperFunctions.object.convertToArray(monthlyData);
//     var data = this.getActiveStudentsAndLicences(monthlyDataArray).sort(this.orderByYear);
//     var colors = [this.color2, this.color3 , this.color1, this.color4];
//     this.ChartsService.buildGroupedBarChart(data, '#activeStudentsAndLicences', 'month', colors);
//   }

//   buildActiveStudentsByMonthChart(monthlyData) {
//     var monthlyDataArray = this.HelperFunctions.object.convertToArray(monthlyData);
//     var data = this.getActiveStudentsByMonth(monthlyDataArray).sort(this.orderByYear);
//     var colors = [this.color2];
//     this.ChartsService.buildGroupedBarChart(data, '#activeStudentsByMonthChart', 'month', colors, true);
//   }

//   buildFullLicencesActivatedByMonthChart(monthlyData) {
//     var monthlyDataArray = this.HelperFunctions.object.convertToArray(monthlyData);
//     var data = this.getFullLicencesActivatedByMonth(monthlyDataArray).sort(this.orderByYear);
//     var colors = [this.color3];
//     this.ChartsService.buildGroupedBarChart(data, '#fullLicencesActivatedByMonthChart', 'month', colors, true);
//   }

//   buildAllLicencesActivatedByMonthChart(monthlyData) {
//     var monthlyDataArray = this.HelperFunctions.object.convertToArray(monthlyData);
//     var data = this.getAllLicencesActivatedByMonth(monthlyDataArray).sort(this.orderByYear);
//     var colors = [this.color1];
//     this.ChartsService.buildGroupedBarChart(data, '#allLicencesActivatedByMonthChart', 'month', colors, true);
//   }

//   buildLicencesSoldByMonthChart(monthlyData) {
//     var monthlyDataArray = this.HelperFunctions.object.convertToArray(monthlyData);
//     var data = this.getLicencesSoldByMonth(monthlyDataArray).sort(this.orderByYear);
//     var colors = [this.color4];
//     this.ChartsService.buildGroupedBarChart(data, '#licencesSoldByMonthChart', 'month', colors, true);
//   }

//   /* ACTIVE CLASSROOMS AND SESSIONS */
//   buildActiveClassroomsAndSessionsChart(monthlyData) {
//     var monthlyDataArray = this.HelperFunctions.object.convertToArray(monthlyData);
//     var colors = [this.color2, this.color3];
//     var data = this.getActiveClassroomsAndSessions(monthlyDataArray).sort(this.orderByYear);
//     this.ChartsService.buildGroupedBarChart(data, '#activeClassroomsAndSessionsChart', 'month', colors);
//   }

//   /* ACTIVE SCHOOLS AND TEACHERS */
//   buildActiveSchoolsAndTeachersChart(monthlyData) {
//     var monthlyDataArray = this.HelperFunctions.object.convertToArray(monthlyData);
//     var colors = [this.color5, this.color3];
//     var data = this.getActiveSchoolsAndTeachers(monthlyDataArray).sort(this.orderByYear);
//     this.ChartsService.buildGroupedBarChart(data, '#activeSchoolsAndTeachersChart', 'month', colors);
//   }

//   /* CREATED ASSIGNMENTS */
//   buildCreatedAssignmentsChart(monthlyData) {
//     var monthlyDataArray = this.HelperFunctions.object.convertToArray(monthlyData);
//     var colors = ['#f7bdb7', '#f39c93', '#ef7a6e', '#eb5a4b'];
//     var data = this.getCreatedAssignments(monthlyDataArray).sort(this.orderByYear);
//     this.ChartsService.buildGroupedBarChart(data, '#createdAssignmentsChart', 'month', colors);
//   }

//   /* FEATURES USED */
//   buildFeaturesUsedChart(monthlyData) {
//     var monthlyDataArray = this.HelperFunctions.object.convertToArray(monthlyData);
//     var colors = [this.color6, this.color2, this.color3, this.color4, this.color5, this.color1];
//     var data = this.getFeaturesUsed(monthlyDataArray).sort(this.orderByYear);
//     this.ChartsService.buildGroupedBarChart(data, '#featuresUsedChart', 'month', colors);
//   }

//   /* CONCEPTS COMPLETED IN CLASS AT HOME */
//   buildConceptsCompletedInClassVsAtHome(monthlyData) {
//     var monthlyDataArray = this.HelperFunctions.object.convertToArray(monthlyData);
//     var colors = [this.color6, this.color2];
//     var data = this.getConceptsCompletedInClassAndAtHome(monthlyDataArray).sort(this.orderByYear);
//     this.ChartsService.buildStackedBarChart(data, '#conceptsCompletedInClassAndAtHomeChart', 'month', colors, true);
//   }

//   /* LEARNING  HOURS IN CLASS AT HOME */
//   buildLearningHoursInClassVsAtHome(monthlyData) {
//     var monthlyDataArray = this.HelperFunctions.object.convertToArray(monthlyData);
//     var colors = [this.color3, this.color5];
//     var data = this.getLearningHoursInClassVsAtHome(monthlyDataArray).sort(this.orderByYear);
//     this.ChartsService.buildStackedBarChart(data, '#learningHoursInClassAndAtHomeChart', 'month', colors, true);
//   }

//   /* AVERAGE RATE OF ASSIGNMENT COMPLETION */
//   buildAvgRateOfAssignmentCompletion(monthlyData) {
//     var monthlyDataArray = this.HelperFunctions.object.convertToArray(monthlyData);
//     var colors = [this.color1, this.color4];
//     var data = this.getAvgRateOfAssignmentCompletion(monthlyDataArray).sort(this.orderByYear);
//     this.ChartsService.buildStackedBarChart(data, '#avgRateOfAssignmentCompletionChart', 'month', colors, false, true);
//   }

//   /* SUMMARY OF TEACHERS MAKING ASSIGNMENTS */
//   buildSummaryOfTeachersMakingAssignments(monthlyData) {
//     var monthlyDataArray = this.HelperFunctions.object.convertToArray(monthlyData);
//     var colors = [this.color1, this.color6];
//     var data = this.getSummaryOfTeachersMakingAssignments(monthlyDataArray).sort(this.orderByYear);
//     this.ChartsService.buildStackedBarChart(data, '#summaryOfTeachersMakingAssignmentsChart', 'month', colors, true);
//   }


// }
