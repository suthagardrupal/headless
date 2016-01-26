/**
 * Created by root on 2/1/16.
 */
/**
 * The angular-drupal module.
 */
angular.module('drupal', []).
service('drupal', ['$http', '$q', 'drupalSettings', drupal]).
value('drupalSettings', null).
value('drupalToken', null).
value('drupalUser', null);