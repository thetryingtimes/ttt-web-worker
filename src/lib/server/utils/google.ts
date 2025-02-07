import type { VoteRequestProps } from '$lib/api/ballots/vote';
import type { GeoResponse } from '$lib/api/geo/geo';
import { z } from 'zod';

const ResultsParser = z.object({
  results: z.array(
    z.object({
      address_components: z.array(
        z.object({
          short_name: z.string(),
          types: z.array(z.string())
        })
      )
    })
  )
});

export class GoogleMapsClient {
  static async geocode(
    platform: App.Platform,
    lat: number,
    lng: number
  ): Promise<GeoResponse> {
    const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${platform.env.GOOGLE_API_KEY}&result_type=country|administrative_area_level_1|administrative_area_level_2`;

    try {
      const req = await fetch(endpoint);
      const res = await req.json();
      const parsed = ResultsParser.parse(res);

      let country = '';
      let props: VoteRequestProps = {
        state: '',
        county: ''
      };

      parsed.results[0].address_components.forEach((component) => {
        if (component.types.includes('country')) country = component.short_name;

        if (
          component.types.includes('administrative_area_level_1') ||
          component.types.includes('locality')
        )
          props.state = component.short_name;

        if (component.types.includes('administrative_area_level_2'))
          props.county = component.short_name;
      });

      if (country !== 'US') {
        console.log(
          '[google]',
          'not US',
          JSON.stringify(parsed.results[0], null, 2)
        );
        return { success: false };
      }

      if (props.state === '' || props.county === '') {
        console.log(
          '[google]',
          'no state or county',
          JSON.stringify(parsed.results[0], null, 2)
        );
        return { success: false };
      }

      return { success: true, props };
    } catch (e) {
      console.log('[google] got error', e);
    }

    return { success: false };
  }
}
