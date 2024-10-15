# ACDH-CH Full Stack Developer Assessment Task

The Social Sciences & Humanities Open Marketplace is a discovery portal which pools and contextualises resources for Social Sciences and Humanities research communities. Its API provides a set of well documented Search Endpoints.
Using the /item-search API endpoint, implement a simple search view.
Start with a React 18 or Vue 3 template (suggested TypeScript templates: https://vite.new/react-ts
or https://vite.new/vue-ts).

## Requirements:

- Input field for the search keyword to be passed on as the q query parameter.
- Filter the search through the categories parameter to return tool-or-service
  items only.
- The result list must contain at least the properties: label, accessibleAt and a list of
  associated contributors .
- Implement pagination with adjustable page size.
- Each item in the result list should link to a detail view, which should display information
  gathered from the /tools-services/:id endpoint.

## Proposed optional features/tasks:

The following are potential extensions of the functionality you can select from and try to implement.
They are not required for the assignment to be considered fulfilled successfully.

- Implement an autocomplete mechanism for the input field using the /item-
  search/autocomplete endpoint.
- Implement a faceting / filtering mechanism for the result list, using the information returned
  from the /item-search endpoint in the facets property. This information needs to be
  passed as query parameters to the item-search endpoint like so https://marketplace-
  api.sshopencloud.eu/api/item-search?order=score&f.activity=Analyzing
