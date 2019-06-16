# AlbumTrackClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## Development server

This client is dependent on running the server API locally (on port 4000). This API is available at [https://github.com/mslosarek/album-track-api](https://github.com/mslosarek/album-track-api).

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Deploy

This application is deploy to an S3 bucket behind an AWS Cloudfront Deploy. After you run `ng build` copy the contents of the `dist/album-track-client/` directory to the S3 bucket. This can be done with the AWS command line tool with `aws s3 sync --delete dist/album-track-client/ s3://album-track`

## Linting

Run `ng lint` to lint the project