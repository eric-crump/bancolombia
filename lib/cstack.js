import ContentstackLivePreview from "@contentstack/live-preview-utils";
import Contentstack from "contentstack";
import Personalize from "@contentstack/personalize-edge-sdk";

// function deserializeVariantIds (variantsQueryParam) {
//   return variantsQueryParam
//       .split(',')
//       .map((variantPair) => `cs_personalize_${variantPair.split('=').join('_')}`)
//       .join(',')
// }

// class PersonalizePlugin {
//   onRequest(stack, request) {
//     console.log('init personalize')
//       const variants = Personalize.getVariants();
//       const params = Object.entries(variants)
//       .filter(([key, value]) => {return `${value}` !== 'null'})
//       .map(([key, value]) => `${key}=${value}`)
//       .join(',');
//       request.option.headers['x-cs-variant-uid'] = deserializeVariantIds(params);  
//       return request;
//   }
//   onResponse(stack, request, response, data) {
    
//       return data;
//   }
// }

Contentstack.Utils.addEditableTags();

const Stack = Contentstack.Stack({
  api_key: process.env.CONTENTSTACK_API_KEY,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.CONTENTSTACK_ENVIRONMENT,
  branch: process.env.CONTENTSTACK_BRANCH ? process.env.CONTENTSTACK_BRANCH : 'main',
  live_preview: {
    preview_token: process.env.CONTENTSTACK_PREVIEW_TOKEN,
    enable: true,
    host: "rest-preview.contentstack.com"
  },
  //plugins: [new PersonalizePlugin()],
  region: Contentstack.Region.NA
});

const getLocaleForURL = () => {
  if(typeof window === 'undefined') return 'en-us'
  return window.location.pathname?.split('/').filter(Boolean)[0]
}

ContentstackLivePreview.init({
  enable: 'true',
  ssr: false,
  mode: 'builder',
  stackSdk: Stack,
  clientUrlParams: {
    protocol: "https",
    host: "app.contentstack.com",
    port: 443,
  },
  stackDetails: {
    apiKey: process.env.CONTENTSTACK_API_KEY,
    environment: process.env.CONTENTSTACK_ENVIRONMENT,
    branch: process.env.CONTENTSTACK_BRANCH ? process.env.CONTENTSTACK_BRANCH : 'main',
    locale: 'en-us'
},
});

Stack.setHost("cdn.contentstack.io")

export function cslp(content, key, index){
  if(!content?.$)
    return {};
  else
    return(content.$[key + index])
}

export default {
  getElement(id, type, locale) {
    return new Promise((resolve, reject) => {
      if (ContentstackLivePreview.hash) {
        Stack.livePreviewQuery({
          live_preview: ContentstackLivePreview.hash
        });
      }
      const Query = Stack.ContentType(type)
        .Entry(id)
        .language(locale ? locale : "en-us")
        .toJSON()
        .fetch()
        .then(
          function success(entry) {
            Contentstack.Utils.addEditableTags(entry, type, true, locale);
            resolve(entry);
          },
          function error(err) {
            console.log("error", err);
            reject(err);
          }
        );
    });
  },

  getElementWithRefs(id, type, locale, references) {
    return new Promise((resolve, reject) => {
      if (ContentstackLivePreview.hash) {
        Stack.livePreviewQuery({
          live_preview: ContentstackLivePreview.hash
        });
      }
      const Query = Stack.ContentType(type)
        .Entry(id)
        .includeReference(...references)
        .language(locale ? locale : "en-us")
        .toJSON()
        .fetch()
        .then(
          function success(entry) {
            Contentstack.Utils.addEditableTags(entry, type, true, locale);
            resolve(entry);
          },
          function error(err) {
            console.log("error", err);
            reject(err);
          }
        );
    });
  },

  getElementByUrl(type, url, locale) {
    return new Promise((resolve, reject) => {
      if (ContentstackLivePreview.hash) {
        Stack.livePreviewQuery({
          live_preview: ContentstackLivePreview.hash
        });
      }
      const Query = Stack.ContentType(type)
        .Query()
        .where("url", { $eq: url })
        .language(locale ? locale : "en-us")
        .toJSON()
        .find()
        .then(
          function success(data) {
            const entry = data[0][0];
            if(window.self !== window.top) 
              Contentstack.Utils.addEditableTags(entry, type, true, locale);
            resolve(entry);
          },
          function error(err) {
            reject(err);
          }
        );
    });
  },

  getElementByUrlWithRefs(type, url, locale, references) {
    return new Promise((resolve, reject) => {
      if (ContentstackLivePreview.hash) {
        Stack.livePreviewQuery({
          live_preview: ContentstackLivePreview.hash
        });
      }
      const Query = Stack.ContentType(type)
        .Query()
        .where("url", { $eq: url })
        .language(locale ? locale : "en-us")
        .includeReference(...references)
        .toJSON()
        .find()
        .then(
          function success(data) {
            const entry = data[0][0];
            if(window.self !== window.top) 
              Contentstack.Utils.addEditableTags(entry, type, true, locale);
            resolve(entry);
          },
          function error(err) {
            reject(err);
          }
        );
    });
  },

  getElementByType(type, locale) {
    return new Promise((resolve, reject) => {
      if (ContentstackLivePreview.hash) {
        Stack.livePreviewQuery({
          live_preview: ContentstackLivePreview.hash
        });
      }
      const Query = Stack.ContentType(type)
        .Query()
        .language(locale ? locale : "en-us")
        .toJSON()
        .find()
        .then(
          function success(entry) {
            if(window.self !== window.top) 
              Contentstack.Utils.addEditableTags(entry[0][0], type, true, locale);
            resolve(entry);
          },
          function error(err) {
            console.log("error", err);
            reject(err);
          }
        );
    });
  },

  getElementByTypeWtihRefs(type, locale, references) {
    return new Promise((resolve, reject) => {
      if (ContentstackLivePreview.hash) {
        Stack.livePreviewQuery({
          live_preview: ContentstackLivePreview.hash
        });
      }
      const Query = Stack.ContentType(type)
        .Query()
        .language(locale ? locale : "en-us")
        .includeReference(...references)
        .toJSON()
        .find()
        .then(
          function success(entry) {
            if(window.self !== window.top) 
              Contentstack.Utils.addEditableTags(entry[0][0], type, true, locale);
            resolve(entry);
          },
          function error(err) {
            console.log("error", err);
            reject(err);
          }
        );
    });
  },

  getElementByTypeByTaxonomy(type, locale, term) {
    return new Promise((resolve, reject) => {
      if (ContentstackLivePreview.hash) {
        Stack.livePreviewQuery({
          live_preview: ContentstackLivePreview.hash
        });
      }
      const Query = Stack.ContentType(type)
        .Query()
        .query({ "taxonomies.article_categories": { $in: term } })
        .language(locale ? locale : "en-us")
        .toJSON()
        .find()
        .then(
          function success(entry) {
            for(let x = 0; x < entry[0].length; x++){
              if(window.self !== window.top) 
                Contentstack.Utils.addEditableTags(entry[0][x], type, true, locale);
            }
            resolve(entry);
          },
          function error(err) {
            console.log("error", err);
            reject(err);
          }
        );
    });
  },

  getPDPbyProduct(type, url, locale){
    return new Promise((resolve, reject) => {
        const Query = Stack.ContentType(type)
          .Query()
          .where("product.data.url", url)
          .language(locale ? locale : "en-us")
          .toJSON()
          .find()
          .then(
            function success(entry) {
              // console.log('entry', entry);
              Contentstack.Utils.addEditableTags(entry[0][0], type, true, locale);
              resolve(entry[0][0]);
            },
            function error(err) {
              console.log("error", err);
              reject(err);
            }
          );
      })
  },

  getElementByTypeByTaxonomyLocation(type, locale, term, references) {
    //console.log("fetching with these params", type, locale, term)
    return new Promise((resolve, reject) => {
      if (ContentstackLivePreview.hash) {
        Stack.livePreviewQuery({
          live_preview: ContentstackLivePreview.hash
        });
      }
      const Query = Stack.ContentType(type)
        .Query()
        .query({ "taxonomies.locations": { $in: term } })
        .language(locale ? locale : "en-us")
        .includeReference(...references)
        
        .toJSON()
        .find()
        .then(
          function success(entry) {
            if(window.self !== window.top) 
              Contentstack.Utils.addEditableTags(entry[0][0], type, true, locale);
            resolve(entry);
          },
          function error(err) {

            console.log("error", err);
            reject(err);
          }
        );
    });
  },

  searchFAQ(term, locale){
    return new Promise((resolve, reject) => {
      if (ContentstackLivePreview.hash) {
        Stack.livePreviewQuery({
          live_preview: ContentstackLivePreview.hash
        });
      }

      const QueryQuestion = Stack.ContentType('faq')
        .Query()
        .regex('categories.faqs.question', term, 'i');

      const QueryAnswer = Stack.ContentType('faq')
        .Query()
        .regex('categories.faqs.answer', term, 'i')

      const Query = Stack.ContentType("faq")
        .Query()
        .or(QueryQuestion, QueryAnswer)
        .language(locale ? locale : "en-us")
        .toJSON()
        .find()
        .then(
          function success(entry) {
            // for(let x = 0; x < entry[0].length; x++){
            //   if(window.self !== window.top) 
            //     Contentstack.Utils.addEditableTags(entry[0][x], type, true, locale);
            // }
            resolve(entry);
          },
          function error(err) {
            console.log("error", err);
            reject(err);
          }
        );
    });
  },

  getStack() {
    return Stack;
  },
};

export const onEntryChange = ContentstackLivePreview.onEntryChange;