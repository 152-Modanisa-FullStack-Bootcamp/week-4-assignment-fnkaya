import {createLocalVue, shallowMount} from "@vue/test-utils";
import VideoCard from "@/components/VideoCard";
import VueRouter from "vue-router";

describe("VideoCard", () => {
    it('should VideoCard component exists', function () {
        const wrapper = mountComponent()
        expect(wrapper.exists()).toBeTruthy()
    });

    it('should title exists ant text match', function () {
        const title = "Video title"
        const wrapper = mountComponent()
        const titleElement = wrapper.find(".video-title")
        expect(titleElement.exists()).toBeTruthy()
        expect(titleElement.text()).toMatch(title)
    });

    it('should watch button is exists', function () {
        const wrapper = mountComponent()
        const button = wrapper.find(".watch-button")
        expect(button.exists()).toBeTruthy()
    });

    it('should video image exists', function () {
        const wrapper = mountComponent()
        const imageElement = wrapper.find("img")
        expect(imageElement.exists()).toBeTruthy()
    });

    it('should hover state change when image hovered', async function () {
        const wrapper = mountComponent()
        const imageElement = wrapper.find("img")

        const { coverImage, hoverImage } = wrapper.props().video
        expect(wrapper.vm.hover).toBeFalsy()
        expect(imageElement.attributes("src")).toMatch(coverImage)
        await imageElement.trigger("mouseover")
        expect(wrapper.vm.hover).toBeTruthy()
        expect(imageElement.attributes("src")).toMatch(hoverImage)
        await imageElement.trigger("mouseout")
        expect(wrapper.vm.hover).toBeFalsy()
        expect(imageElement.attributes("src")).toMatch(coverImage)
    });

    const mountComponent = () => {
        const localVue = createLocalVue()
        localVue.use(VueRouter)

        return shallowMount(VideoCard, {
            localVue,
            router: new VueRouter(),
            propsData: {
                video: {
                    title: "Video title",
                    coverImage: "cover.image",
                    hoverImage: "hover.image"
                }
            },
            data() {
                return {
                    hover: false
                }
            },
            computed: {

            }
        })
    }
})