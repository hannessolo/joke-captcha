import gpt_2_simple as gpt2
import os
import tensorflow as tf
import requests


def start():
    model_name = "124M"
    if not os.path.isdir(os.path.join("models", model_name)):
        print(f"Downloading {model_name} model...")
        gpt2.download_gpt2(model_name=model_name)

    sess = gpt2.start_tf_sess()
    gpt2.load_gpt2(sess, model_name=model_name)
    return sess

def generate(prefix):
    sess = start()
    text = gpt2.generate(sess,
                         length=40,
                         top_k=10,
                         prefix=prefix,
                         include_prefix=True,
                         return_as_list=True
                         )[0]
    tf.reset_default_graph()
    sess.close()
    return text
