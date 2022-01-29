import { pactWith } from "jest-pact";
import { Matchers } from "@pact-foundation/pact";
import { API } from "@/utils/Api";

const { eachLike, like, } = Matchers;

pactWith({
    consumer: "frontend",
    provider: "backend"
}, provider => {
    describe("videos", () => {
        let api

        beforeEach(() => {
            api = new API(provider.mockService.baseUrl)
        })

        it("fetch videos", async () => {
            await provider.addInteraction({
                state: "fetch videos successfully",
                uponReceiving: "a request not empty for videos",
                withRequest: {
                    method: "GET",
                    path: "/videos",
                },
                willRespondWith: {
                    status: 200,
                    header: {
                        "Content-Type": "application/json; charset=UTF-8",
                    },
                    body: {
                        data: eachLike({
                            id: like(1),
                            videoAddress: like("videoAddress"),
                            coverImage: like("coverImage"),
                            hoverImage: like("hoverImage"),
                            title: like("Vue.js Crash Course"),
                            viewCount: like(255),
                            publishDateInMonth: like(10),
                            ownerImage: like("ownerImage"),
                            ownerName: like("ownerName"),
                            description: like("description"),
                            favorite: like(true),
                        })
                    }
                }
            })
            const response = await api.getVideos()
            expect(response.data[0].id).toBe(1)
        });
    })
})