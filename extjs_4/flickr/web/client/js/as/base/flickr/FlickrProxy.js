Ext.namespace('as.base.flickr');
/*
Utility class for connecting to flickr
*/
as.base.flickr.FlickrProxy = Ext.extend(Ext.data.ScriptTagProxy,
{
   url          : 'http://api.flickr.com/services/rest/',
   method       : null,
   apiKey       : null,
   callbackParam: 'jsoncallback',

   constructor: function(config)
   {
      as.base.flickr.FlickrProxy.superclass.constructor.call(this, config);
      this.on('beforeload', this.onBeforeLoad, this);
   },

   onBeforeLoad: function(o, params)
   {
      Ext.apply(params,
      {
         format : 'json',
         api_key: this.apiKey,
         method : 'flickr.' + this.method
      }
      );
      return true;
   }
}
);