(function($){

	$.urlParser = function( _url ) {

		var url = _url || window.location.href;    

		/* Parser baseado em: https://github.com/kvz/phpjs/raw/master/functions/url/parse_url.js */
		var parser = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

		var urlInfo = {
			'source' : null,
			'protocol' : null,
			'authority' : null,
			'userInfo' : null,
			'user' : null,
			'password' : null,
			'host' : null,
			'port' : null,
			'relative' : null,
			'path' : null,
			'directory' : null,
			'file' : null,
			'query' : null,
			'anchor' : null
		};

		var urlParams = [];

		var _methods = {
			parseUrl: function( url ) {
				var r = parser.exec( url );
				_methods.setSource(r[0]);
				_methods.setProtocol(r[1]);
				_methods.setAuthority(r[2]);
				_methods.setUserInfo(r[3]);
				_methods.setUser(r[4]);
				_methods.setPassword(r[5]);
				_methods.setHost(r[6]);
				_methods.setPort(r[7]);
				_methods.setRelative(r[8]);
				_methods.setPath(r[9]);
				_methods.setDirectory(r[10]);
				_methods.setFile(r[11]);
				_methods.setQuery(r[12]);
				_methods.setAnchor(r[13]);
			},
			setSource: function( _source ) {
				urlInfo.source = _source;
			},
			setProtocol: function( _protocol ) {
				urlInfo.protocol = _protocol;
			},
			setAuthority: function( _authority ) {
				urlInfo.authority = _authority;
			},
			setUserInfo: function( _userInfo ) {
				urlInfo.userInfo = _userInfo;
			},
			setUser: function( _user ) {
				urlInfo.user = _user;
			},
			setPassword: function( _password ) {
				urlInfo.password = _password;
			},
			setHost: function( _host ) {
				urlInfo.host = _host;
			},
			setPort: function( _port ) {
				urlInfo.port = _port;
			},
			setRelative: function ( _relative ) {
				urlInfo.relative = _relative;
			},
			setPath: function ( _path ) {
				urlInfo.path = _path;
			},
			setDirectory: function( _directory ) {
				urlInfo.directory = _directory;
			},
			setFile: function( _file ) {
				urlInfo.file = _file;
			},
			setQuery: function( _query ) {
				urlInfo.query = _query;
				_methods.makeParams(_query);
			},
			setAnchor: function( _anchor ) {
				urlInfo.anchor = _anchor;
			},
			makeParams: function ( _query ) {
				if( _query ) {
					var qtmp, vtmp;
					qtmp = _query.split(/&/);
					$.each(qtmp, function(index, value){
						vtmp = value.replace(/=/,'@=+@+=@').split('@=+@+=@');
						urlParams[vtmp[0]] = vtmp[1];
					});
				}
			}
		};

		var methods = {
			getSource: 		function() { return urlInfo.source; },
			getProtocol: 	function() { return urlInfo.protocol; },
			getAuthority: 	function() { return urlInfo.authority; },
			getUserInfo: 	function() { return urlInfo.userInfo; },
			getUser: 		function() { return urlInfo.user; },
			getPassword: 	function() { return urlInfo.password; },
			getHost: 		function() { return urlInfo.host; },
			getPort: 		function() { return urlInfo.port; },
			getRelative: 	function() { return urlInfo.relative; },
			getPath: 		function() { return urlInfo.path; },
			getDirectory: 	function() { return urlInfo.directory; },
			getFile: 		function() { return urlInfo.file; },
			getQuery: 		function() { return urlInfo.query; },
			getAnchor: 		function() { return urlInfo.anchor; },

			getQueryParam: 	function( param ) {
				if ( param ) {
					return urlParams[param];
				}
				return false;
			}
		};

		_methods.parseUrl( url );

		return methods;
	};
})(jQuery);