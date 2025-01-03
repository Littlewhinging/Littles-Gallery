/* eslint-disable import/no-named-as-default-member */
import {
	GetObjectCommand,
	ListObjectsV2Command,
	S3Client
} from "@aws-sdk/client-s3";
import mime from "mime-types";

import {
	r2Endpoint as endpoint,
	r2AccessKey as accessKeyId,
	r2AccessSecret as secretAccessKey,
	r2BucketName as bucketName,
	r2BucketHostname as bucketHostname
} from "./environment";

const client = new S3Client({
	region: "auto",
	endpoint,
	credentials: {
		accessKeyId,
		secretAccessKey
	}
});

export interface BucketObject {
	id: string;
	url: string;
	type: string;
	updatedAt: Date;
}

export async function listObjects(): Promise<Array<BucketObject>> {

	var { Contents: data, NextContinuationToken: token, IsTruncated: IsTruncated } = await client.send(
		new ListObjectsV2Command({
			Bucket: bucketName,
		})
	);

	while (IsTruncated) {
		var { Contents: data2, NextContinuationToken: token, IsTruncated: IsTruncated } = await client.send(
			new ListObjectsV2Command({
				Bucket: bucketName,
				ContinuationToken: token
			})
		);

		console.log(IsTruncated)

		if (data2 != undefined)
			data = data?.concat(data2);
		else
			break;
	}

	return (
		data?.map((object) => ({
			id: object.Key!,
			url: new URL(object.Key!, bucketHostname).href,
			type: mime.lookup(object.Key!) || "application/octet-stream",
			updatedAt: object.LastModified!
		})) ?? []
	)
		.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
		.filter((a) => !a.id.toLowerCase().includes("build"));
}

export async function getObject(id: string): Promise<BucketObject | null> {
	const value = await client
		.send(
			new GetObjectCommand({
				Bucket: bucketName,
				Key: decodeURI(id)
			})
		)
		.catch((reason) => {
			if (reason.name === "NoSuchKey") return null;
			throw reason;
		});

	if (!value) return null;
	const { LastModified, ContentType } = value;

	return {
		id,
		url: new URL(id, bucketHostname).href,
		type: ContentType!,
		updatedAt: LastModified!
	};
}
