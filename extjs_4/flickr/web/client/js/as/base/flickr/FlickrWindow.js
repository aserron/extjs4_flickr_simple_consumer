Ext.namespace('as.base.flickr');

as.base.flickr.FlickrWindow = Ext.extend(Ext.Window,
{
   store: null,
   resizable: false,
   imageSize: 'm',
   title: 'flickr Window',

   initComponent: function()
   {
      Ext.QuickTips.init();
      this.searchBox = new Ext.form.TextField(
      {
         defaultAutoCreate: { tag: "input", type: "text", size: "10", autocomplete: "off" },
         value: 'nature',
         enableKeyEvents: true,
         listeners:
         {
            scope: this,
            keypress: function(f, e) {
               if (e.getKey() == e.RETURN) {
                  this.doSearch();
		}
            }
         }
      }
      );
      Ext.apply(this,
      {
         tbar:
         [
            {
               iconCls: 'x-tbar-page-prev',
               handler: this.onPreviousClick,
               scope: this,
               tooltip: { text: 'Go to the previous image' }
            },
            {
               iconCls: 'x-tbar-page-next',
               handler: this.onNextClick,
               scope: this,
               tooltip: { text: 'Go to the next image' }
            },
            '->',
			   {
			      iconCls: 'sizer',
			      tooltip: { text: 'Set the size of the images' },
			      menu:
				   {
				      items:
				      [
				         this.createSizeItem('Small', 's'),
				         this.createSizeItem('Thumb', 't'),
				         this.createSizeItem('Medium', 'm'),
				         this.createSizeItem('Big', 'b')
   				   ]
				   }
			   },
		   	'-',
		   	{
		   	   iconCls: 'view',
		   	   handler: this.onViewClick,
		   	   scope: this,
		   	   tooltip: { text: 'View this photo at the flickr site' }
		   	}
         ],
         bbar:
         [
            this.searchBox,
            {
               iconCls: 'find',
               handler: this.doSearch,
               scope: this,
               tooltip: { text: 'Click to search for images' }
            }
         ]
      }
      );
      as.base.flickr.FlickrWindow.superclass.initComponent.call(this);
      this.store.on('beforeload', this.onBeforeLoad, this);
      this.store.on('load', this.onLoad, this);
      this.active = 0;
   },

   createSizeItem: function(label, code)
   {
      return {
         text: label,
         group: 'imageSize',
         checked: this.imageSize == code,
         handler: this.setImageSize.createDelegate(this, [code], false)
      };
   },

   afterRender: function()
   {
      as.base.flickr.FlickrWindow.superclass.afterRender.call(this);
      //hide the image initially
      this.img = Ext.DomHelper.append(this.body, { tag: 'img', alt: '', src: '', cls: 'x-hide-display' }, true);
      this.img.on('load', this.onImageLoad, this);
      this.doSearch();
   },

   doSearch: function()
   {
      var text = this.searchBox.getValue().trim();
      if (text.length > 0)
      {
         text = text.replace(/ /g, ',');
         this.store.load(
         {
            params: { tags: text }
         }
         );
      }
   },

   onViewClick: function()
   {
      window.open(this.viewUrl);
   },

   onPreviousClick: function()
   {
      if (this.active == 0)
         this.active = this.store.getCount() - 1
      else
         --this.active;

      this.setImage();
   },

   onNextClick: function()
   {
      if (this.active == this.store.getCount() - 1)
         this.active = 0;
      else
         ++this.active;

      this.setImage();
   },

   onBeforeLoad: function()
   {
      if (!this.masked)
      {
         this.body.mask('Loading', 'x-mask-loading');
         this.getTopToolbar().disable();
         this.masked = true;
      }
   },

   onLoad: function()
   {
      this.active = 0;
      this.setImage();
   },

   onImageLoad: function()
   {
      this.body.unmask();
      this.getTopToolbar().enable();
      this.masked = false;
      var title = this.img.dom.alt;
      if (title == '')
         title = 'Untitled';

      this.setTitle(Ext.util.Format.ellipsis(this.img.dom.alt, this.getTextSize()));
      this.img.removeClass('x-hide-display');
      var sz = this.img.getSize();
      if (sz.width < 110)
         sz.width = 110;

      this.body.setSize(sz);
      this.syncSize();
      this.setWidth(sz.width + 14);
      this.img.fadeIn({ duration: 1 });
   },

   getTextSize: function()
   {
      switch (this.imageSize)
      {
         case 's': return 10;
         case 't': return 12;
         case 'm': return 25;
         default: return 40;
      }
   },

   setImage: function()
   {
      this.onBeforeLoad();
      var rec = this.store.getAt(this.active);
      this.constructUrl(rec);
      this.img.dom.alt = rec.get('title');
      this.img.dom.src = this.imageUrl;
   },

   constructUrl: function(rec)
   {
      //construct the URL for the photo as per: http://www.flickr.com/services/api/misc.urls.html
      this.imageUrl = String.format('http://farm{0}.static.flickr.com/{1}/{2}_{3}_{4}.jpg', rec.get('farm'), rec.get('server'), rec.get('id'), rec.get('secret'), this.imageSize);
      this.viewUrl = String.format('http://www.flickr.com/photos/{0}/{1}', rec.get('owner'), rec.get('id'));
   },

   setImageSize: function(sz)
   {
      var prev = this.imageSize;
      this.imageSize = sz;
      if (sz != prev)
         this.setImage();
   }
}
);