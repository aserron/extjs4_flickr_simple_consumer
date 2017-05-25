Ext.namespace('as.base.flickr');

/*
Creates a reader to grab photo data from as.base.flickr. Note that although
flickr only shows the response as XML, there are several response formats available.
The XML maps to JSON, eg:

<photos>
   <photo id="1" />
   <photo id="2" />
</photos>

Will be

{
   photos:
   {
      photo: [{id: 1}, {id: 2}]
   }
}
*/
as.base.flickr.FlickrPhotoReader = Ext.extend(Ext.data.JsonReader,
{
   constructor: function()
   {
      this.rec = Ext.data.Record.create(
      [
         'title',
         'author',
         'author_id',
         'owner',
         'link',
         'media',
         'description',
         'tags',
         { name: 'date_taken', type: 'date' },
         { name: 'published', type: 'date' },
         // 'server',
         // { name: 'farm', type: 'int' },
         
         { name: 'ispublic', type: 'boolean' },
         { name: 'isfriend', type: 'boolean' },
         { name: 'isfamily', type: 'boolean' }
      ]
      );
      as.base.flickr.FlickrPhotoReader.superclass.constructor.call(this,
      {
         totalProperty: false,// 'photos.total',
         root: 'items',//'photos.photo',
         id: 'title'
      }, this.rec);
   }
}
);