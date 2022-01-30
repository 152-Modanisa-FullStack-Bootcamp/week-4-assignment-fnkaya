import {shallowMount} from "@vue/test-utils";
import VideoCard from "@/components/VideoCard";

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

    const mountComponent = () => {
        return shallowMount(VideoCard, {
            propsData: {
                video: {
                    title: "Video title"
                }
            }
        })
    }
})