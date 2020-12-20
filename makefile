.PHONY: docker node npm

NODE_IMAGE=node:12-alpine
DK_IMAGE=vue-template
DK_IMAGE_TAG=latest

node:
	@docker stop temp || true
	@docker run -it --rm --name temp -u $$(id -u):$$(id -g) \
	  -v $$(pwd):/usr/local/src -w /usr/local/src \
		-e NODE_OPTIONS=--max_old_space_size=4096 -e NODE_ENV=development \
		-p 8080:8080 \
		$(NODE_IMAGE) sh

vue-cli:
	@docker run -it --rm --name temp -v $$(pwd):/usr/local/src -w /usr/local/src -p 8080:8080 $(NODE_IMAGE) sh -c "npm install -g @vue/cli; su node; sh"

docker-build:
	@docker build . -t $(DK_IMAGE):$(DK_IMAGE_TAG)

docker-push: docker-build
	@docker push $(DK_IMAGE):$(DK_IMAGE_TAG)

docker-test: docker-build
	@docker stop temp || true
	@docker run -d --rm --name temp -p 8080:80 $(DK_IMAGE):$(DK_IMAGE_TAG)