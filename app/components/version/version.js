'use strict';

angular.module('movieInfo.version', [
  'movieInfo.version.interpolate-filter',
  'movieInfo.version.version-directive'
])

.value('version', '0.1');
