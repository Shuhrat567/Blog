import {gql, request} from "graphql-request";
import {IBlog} from "@/types";


const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!

export const getBlogs = async () => {
    const query = gql`
    	query MyQuery {
  			blogs {
  			  title
  			  createdAt
  			  author {
  			    name
  			    image {
  			      url
  			    }
  	  		}
  	  		category {
  	  		  name
  	  		  slug
  	  		}
  	  		description
  		    tag {
    	    name
    	    slug
    	  }
    	  image {
    	    url
    	  }
    	  content {
      		html
    	  }
    	  slug
       }
    }
   `
    const {blogs} = await request<{ blogs: IBlog[] }>(graphqlAPI, query)
    return blogs
}
export const getDetailedBlog = async (slug: string) => {
    const query = gql`
		query MyQuery ($slug: String!){
  			blog(where: {slug: $slug}) {
    		author {
      			name
      			image {
        			url	
      			}
    		}
    		content {
      			html
    		}
    		createdAt
    		image {
      			url
    		}
    		slug
    		tag {
      			name	
      			slug
    		}
    		title
    	}	
	}	
`
    const {blog} = await request<{blog: IBlog}>(graphqlAPI, query, {slug})
    return blog
}